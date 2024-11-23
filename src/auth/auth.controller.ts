import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import {
  LoggerProcessor,
  UnprotectedControllerLogInput,
} from 'src/utils/log-helper';
import { IRequestDetails } from 'src/utils/types/request-details';
import { AuthService_V1_0_0 } from './auth.service';
import { REQUEST } from '@nestjs/core';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth -login.dto';

@Controller({
  path: 'auth',
  version: '1.0.0',
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly loggerProcessor = new LoggerProcessor();

  constructor(
    @Inject(REQUEST) private request: IRequestDetails,
    public service: AuthService_V1_0_0,
  ) {}

  @Post('register/admin')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDtO: AuthRegisterDto) {
    const logInput = new UnprotectedControllerLogInput({
      requestId: this.request.requestId,
      message: 'Registering a user using email',
    });
    this.logger.log(logInput.accept(this.loggerProcessor));
    return this.service.register(createUserDtO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthLoginDto) {
    const logInput = new UnprotectedControllerLogInput({
      requestId: this.request.requestId,
      message: 'Logging in a user using email',
    });
    this.logger.log(logInput.accept(this.loggerProcessor));
    return this.service.validateLogin(loginDto);
  }
}
