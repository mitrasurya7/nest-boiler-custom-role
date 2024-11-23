import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserExistsGuard } from '../user-exists/user-exists.guard';
import { IRequestDetails } from 'src/utils/types/request-details';
import { RolesService_V1_0_0 } from './roles.service';
import { REQUEST } from '@nestjs/core';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionEnum } from 'src/permissions/permissions.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { AuthUser } from 'src/users/user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  LoggerProcessor,
  ProtectedControllerLogWithEntityNameInput,
} from 'src/utils/log-helper';

@UseGuards(AuthGuard('jwt'), UserExistsGuard)
@Controller({
  path: 'roles',
  version: '1.0.0',
})
export class RolesController {
  private readonly logger = new Logger(RolesController.name);
  private readonly loggerProcessor = new LoggerProcessor();

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    private readonly rolesService: RolesService_V1_0_0,
  ) {}

  @Permissions(PermissionEnum.CREATE_ROLE)
  @UseGuards(PermissionsGuard)
  @Post(['admin'])
  async create(@AuthUser() user: any, @Body() createRoleDto: CreateRoleDto) {
    const logInput = new ProtectedControllerLogWithEntityNameInput({
      requestId: this.request.requestId,
      userId: user.id,
      entityName: createRoleDto.name,
      message: 'Creating a role',
    });
    this.logger.log(logInput.accept(this.loggerProcessor));
    return this.rolesService.create(createRoleDto);
  }
}
