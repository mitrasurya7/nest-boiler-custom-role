import {
  Injectable,
  CanActivate,
  ExecutionContext,
  OnApplicationBootstrap,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '../role-permissions/entities/role-permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsGuard implements CanActivate, OnApplicationBootstrap {
  private static rolePermissions: RolePermission[];
  private static initialized = false;

  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionsRepository: Repository<RolePermission>,
    private reflector: Reflector,
  ) {}

  async onApplicationBootstrap() {
    if (PermissionsGuard.initialized) return;
    const rolePermissions = await this.rolePermissionsRepository
      .createQueryBuilder('rolePermission')
      .getMany();
    PermissionsGuard.rolePermissions = rolePermissions;
    PermissionsGuard.initialized = true;
  }

  canActivate(context: ExecutionContext): boolean {
    if (!PermissionsGuard.initialized) {
      throw new InternalServerErrorException(
        'PermissionsGuard has not been initialized yet',
      );
    }
    const permissions = this.reflector.getAllAndOverride<number[]>(
      'permissions',
      [context.getClass(), context.getHandler()],
    );
    if (!permissions.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let permittedFlag = true;
    console.log('permissions', PermissionsGuard.rolePermissions);
    for (let i = 0; i < permissions.length; i++) {
      const result = PermissionsGuard.rolePermissions.find((rolePermission) => {
        if (
          rolePermission.roleId === request.user.role &&
          rolePermission.permissionId === permissions[i]
        ) {
          return true;
        }
      });
      if (!result) {
        permittedFlag = false;
        break;
      }
    }
    return permittedFlag;
  }
}
