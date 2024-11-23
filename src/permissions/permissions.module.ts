import { Module } from '@nestjs/common';
import { PermissionsService_V1_0_0 } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Permission, User])],
  providers: [PermissionsService_V1_0_0],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
