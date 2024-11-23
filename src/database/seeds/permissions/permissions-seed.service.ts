import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../../../permissions/entities/permission.entity';
import { PermissionEnum } from '../../../permissions/permissions.enum';
import { Repository } from 'typeorm';
@Injectable()
export class PermissionsSeedService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async run() {
    const countPermissions = await this.permissionRepository.count();
    if (countPermissions) return;
    const permissionNames = Object.keys(PermissionEnum).filter((key) =>
      isNaN(Number(key)),
    );
    const permissions = permissionNames.map((permissionName) => {
      return this.permissionRepository.create({
        id: PermissionEnum[permissionName],
        name: permissionName,
      });
    });
    await this.permissionRepository.save(permissions);
  }
}
