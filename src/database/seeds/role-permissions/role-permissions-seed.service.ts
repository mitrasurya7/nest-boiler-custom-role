import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEnum } from 'src/permissions/permissions.enum';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionsSeedService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionsRepository: Repository<RolePermission>,
  ) {}

  async run() {
    const countRolePermissions = await this.rolePermissionsRepository.count();
    if (countRolePermissions) return;
    const permissionNames = Object.keys(PermissionEnum).filter((key) =>
      isNaN(Number(key)),
    );

    const superAdminPermissions = permissionNames.map((permissionName) => {
      return this.rolePermissionsRepository.create({
        roleId: RoleEnum.SUPER_ADMIN,
        permissionId: PermissionEnum[permissionName],
      });
    });
    await this.rolePermissionsRepository.save(superAdminPermissions);

    const adminPermissions = permissionNames.map((permissionName) => {
      return this.rolePermissionsRepository.create({
        roleId: RoleEnum.ADMIN,
        permissionId: PermissionEnum[permissionName],
      });
    });
    await this.rolePermissionsRepository.save(adminPermissions);
  }
}
