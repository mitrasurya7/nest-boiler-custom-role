import { Module } from '@nestjs/common';
import { UsersService_V1_0_0 } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RolePermission])],
  providers: [UsersService_V1_0_0],
  exports: [UsersService_V1_0_0],
})
export class UsersModule {}
