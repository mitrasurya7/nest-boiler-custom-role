import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Logger,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserExistsGuard } from '../user-exists/user-exists.guard';
import { AuthUser } from '../users/user.decorator';
import { infinityPagination } from '../utils/infinity-pagination';
import { IRequestDetails } from '../utils/types/request-details';
import { Permissions } from './permissions.decorator';
import { PermissionEnum } from './permissions.enum';
import { PermissionsGuard } from './permissions.guard';
import { PermissionsService_V1_0_0 } from './permissions.service';
import {
  LoggerProcessor,
  ProtectedControllerLogInput,
} from '../utils/log-helper';

@UseGuards(AuthGuard('jwt'), UserExistsGuard)
@Controller()
export class PermissionsController {
  private readonly logger = new Logger(PermissionsController.name);
  private readonly loggerProcessor = new LoggerProcessor();

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    private readonly permissionsService: PermissionsService_V1_0_0,
  ) {}

  @Permissions(PermissionEnum.CREATE_ROLE_PERMISSION)
  @UseGuards(PermissionsGuard)
  @Get(['admin/permissions'])
  async findAll(
    @AuthUser() user: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ) {
    const logInput = new ProtectedControllerLogInput({
      requestId: this.request.requestId,
      userId: user.id,
      message: 'Finding permissions',
    });
    this.logger.debug(logInput.accept(this.loggerProcessor));
    const [permissions, count] = await this.permissionsService.findAll({
      page,
      limit,
    });
    return infinityPagination(permissions, count, { page, limit });
  }
}
