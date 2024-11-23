import { Module } from '@nestjs/common';
import { RolesService_V1_0_0 } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, RolePermission])],
  providers: [RolesService_V1_0_0],
  controllers: [RolesController],
  exports: [RolesService_V1_0_0],
})
export class RolesModule {}
