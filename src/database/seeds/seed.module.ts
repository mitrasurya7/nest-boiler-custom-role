import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { DataSource } from 'typeorm';
import { RolesSeedModule } from './roles/roles-seed.module';
import { PermissionsSeedModule } from './permissions/permissions-seed.module';
import { UsersSeedModule } from './users/users-seed.module';
import { RolePermissionsSeedModule } from './role-permissions/role-permissions-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    RolesSeedModule,
    PermissionsSeedModule,
    UsersSeedModule,
    RolePermissionsSeedModule,
  ],
})
export class SeedModule {}
