import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../roles/entities/role.entity';
import { RoleEnum } from '../../../roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RolesSeedService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async run() {
    const countRoles = await this.rolesRepository.count();
    if (countRoles) return;
    const roleNames = Object.keys(RoleEnum).filter((key) => isNaN(Number(key)));
    const roles = roleNames.map((roleName) => {
      return this.rolesRepository.create({
        id: RoleEnum[roleName],
        name: roleName,
      });
    });
    await this.rolesRepository.save(roles);
  }
}
