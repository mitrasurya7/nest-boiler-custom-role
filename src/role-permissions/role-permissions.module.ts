import { Module } from '@nestjs/common';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsService_V1_0_0 } from './role-permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RolePermission } from './entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, User])],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService_V1_0_0],
})
export class RolePermissionsModule {}
