import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../../../role-permissions/entities/role-permission.entity';
import { RolePermissionsSeedService } from './role-permissions-seed.service';
@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  providers: [RolePermissionsSeedService],
  exports: [RolePermissionsSeedService],
})
export class RolePermissionsSeedModule {}
