import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService_V1_0_0 } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: configService.get('auth.expires') },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService_V1_0_0, JwtStrategy],
  exports: [AuthService_V1_0_0],
})
export class AuthModule {}
