import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IRequestDetails } from 'src/utils/types/request-details';
import { RolePermission } from './entities/role-permission.entity';
import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionsService_V1_0_0 {
  private readonly logger = new Logger(RolePermissionsService_V1_0_0.name);

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    @InjectRepository(RolePermission)
    private rolePermissionsRepository: Repository<RolePermission>,
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    const newRolePermissions = createRolePermissionDto.permissionIds.map(
      (permissionId) => {
        return this.rolePermissionsRepository.create({
          roleId: createRolePermissionDto.roleId,
          permissionId,
        });
      },
    );
    const rolePermissions = await this.rolePermissionsRepository
      .createQueryBuilder('rolePermission')
      .insert()
      .into(RolePermission)
      .values(newRolePermissions)
      .orUpdate(['updatedAt'], ['roleId', 'permissionId'])
      .returning('*')
      .execute()
      .then<RolePermission[]>((response) => response.raw);
    this.logger.log(
      `REQUEST_ID=${
        this.request.requestId
      } ROLE_PERMISSION_ID=${rolePermissions.map(
        (rolePermission) => rolePermission.id,
      )} MESSAGE=Role-permissions have been created`,
    );
    return rolePermissions;
  }
}
