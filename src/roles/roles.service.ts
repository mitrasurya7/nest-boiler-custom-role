import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IRequestDetails } from 'src/utils/types/request-details';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService_V1_0_0 {
  private readonly logger = new Logger(RolesService_V1_0_0.name);

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository
      .createQueryBuilder('role')
      .insert()
      .into(Role)
      .values(createRoleDto)
      .returning('*')
      .execute()
      .then<Role>((response) => response.raw[0]);
    this.logger.log(
      `REQUEST_ID=${this.request.requestId} ROLE_ID=${role.id} MESSAGE=Created a role`,
    );
    return role;
  }
}
