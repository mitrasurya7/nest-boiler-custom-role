import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  LoggerProcessor,
  ProtectedControllerLogForJunctionInput,
} from 'src/utils/log-helper';
import { IRequestDetails } from 'src/utils/types/request-details';
import { RolePermissionsService_V1_0_0 } from './role-permissions.service';
import { PermissionEnum } from 'src/permissions/permissions.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { AuthUser } from 'src/users/user.decorator';
import { Permissions } from '../permissions/permissions.decorator';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserExistsGuard } from 'src/user-exists/user-exists.guard';

@UseGuards(AuthGuard('jwt'), UserExistsGuard)
@Controller({
  path: 'role-permissions',
  version: '1.0.0',
})
export class RolePermissionsController {
  private readonly logger = new Logger(RolePermissionsController.name);
  private readonly loggerProcessor = new LoggerProcessor();

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    private readonly rolePermissionsService: RolePermissionsService_V1_0_0,
  ) {}

  @Permissions(PermissionEnum.CREATE_ROLE_PERMISSION)
  @UseGuards(PermissionsGuard)
  @Post(['admin'])
  create(
    @AuthUser() user: any,
    @Body() createRolePermissionDto: CreateRolePermissionDto,
  ) {
    const logInput = new ProtectedControllerLogForJunctionInput({
      requestId: this.request.requestId,
      userId: user.id,
      firstEntityName: 'ROLE_ID',
      firstEntityId: createRolePermissionDto.roleId,
      secondEntityName: 'PERMISSION_ID',
      secondEntityId: createRolePermissionDto.permissionIds,
      message: 'Creating role permissions',
    });
    this.logger.log(logInput.accept(this.loggerProcessor));
    return this.rolePermissionsService.create(createRolePermissionDto);
  }
}
