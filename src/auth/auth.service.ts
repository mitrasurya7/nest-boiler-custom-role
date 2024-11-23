import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IRequestDetails } from 'src/utils/types/request-details';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs'; // Make sure bcrypt is imported
import { AuthLoginDto } from './dto/auth -login.dto';
import { UsersService_V1_0_0 } from 'src/users/users.service';

@Injectable()
export class AuthService_V1_0_0 {
  private readonly logger = new Logger(AuthService_V1_0_0.name);

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    private jwtService: JwtService,
    private dataSource: DataSource,
    private userService: UsersService_V1_0_0,
  ) {}

  async register(dto: AuthRegisterDto) {
    let transactionError: Error;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Hash the password before saving
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      const user = await queryRunner.manager
        .createQueryBuilder(User, 'user')
        .insert()
        .into(User)
        .values({
          ...dto,
          roleId: 1,
          password: hashedPassword, // Use the hashed password
          previousPasswordExists: false,
        })
        .returning('*')
        .execute();

      await queryRunner.commitTransaction();
      delete user.raw[0].password;

      return user.raw[0];
    } catch (error) {
      transactionError = error;
      await queryRunner.rollbackTransaction();
      this.logger.error('Registration error', error);
      throw error; // Re-throw the error after logging
    } finally {
      await queryRunner.release();
      if (transactionError) {
        throw transactionError;
      }
    }
  }

  async validateLogin(loginDto: AuthLoginDto): Promise<any> {
    try {
      const user = await this.userService.findOne({
        email: loginDto.email,
      });

      if (!user) throw new UnauthorizedException('Wrong email/password');
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid)
        throw new UnauthorizedException('Wrong email/password');
      this.logger.log(
        `REQUEST_ID=${this.request.requestId} TARGET_USER_ID=${user.id} MESSAGE=User has been logged in`,
      );

      const token = this.jwtService.sign({
        id: user.id,
        role: user.role.id,
      });
      return { code: HttpStatus.OK, user, token };
    } catch (error) {
      this.logger.error('Login error', error);
      throw new UnauthorizedException('Wrong email/password');
    }
  }
}
