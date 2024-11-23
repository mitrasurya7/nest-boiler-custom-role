import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IRequestDetails } from 'src/utils/types/request-details';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class UsersService_V1_0_0 {
  private readonly logger = new Logger(UsersService_V1_0_0.name);
  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(fields: EntityCondition<User>, excludeSuperAdmin?: boolean) {
    let query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermissions')
      .where('(user.id = :id OR user.email = :email)', {
        id: fields.id,
        email: fields.email,
      });

    if (excludeSuperAdmin) {
      query = query.andWhere('user.roleId != :roleId', {
        roleId: RoleEnum.SUPER_ADMIN,
      });
    }
    const user = await query.getOne();
    if (!user) throw new NotFoundException('User not found');
    this.logger.debug(
      `REQUEST_ID=${this.request.requestId} TARGET_USER_ID=${user.id} MESSAGE=Found a user`,
    );
    return user;
  }
}
