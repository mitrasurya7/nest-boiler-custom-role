import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { IRequestDetails } from '../utils/types/request-details';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService_V1_0_0 {
  private readonly logger = new Logger(PermissionsService_V1_0_0.name);

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<[Permission[], number]> {
    const [permissions, count] = await this.permissionsRepository
      .createQueryBuilder('permissions')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    this.logger.debug(
      `REQUEST_ID=${this.request.requestId} MESSAGE=Found permissions`,
    );
    return [permissions, count];
  }
}
