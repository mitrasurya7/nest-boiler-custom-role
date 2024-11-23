import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async run() {
    const countUsers = await this.usersRepository.count();
    if (countUsers) return;
    const users = [
      this.usersRepository.create({
        name: 'superadmin',
        email: 'superadmin@mail.com',
        password: 'password',
        roleId: RoleEnum.SUPER_ADMIN,
      }),
      this.usersRepository.create({
        name: 'admin',
        email: 'admin@mail.com',
        password: 'password',
        roleId: RoleEnum.ADMIN,
      }),
      this.usersRepository.create({
        name: 'user',
        email: 'user@mail.com',
        password: 'password',
        roleId: RoleEnum.USER,
      }),
    ];
    await this.usersRepository.save(users);
  }
}
