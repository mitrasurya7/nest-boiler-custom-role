import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../../permissions/entities/permission.entity';
import { PermissionsSeedService } from './permissions-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsSeedService],
  exports: [PermissionsSeedService],
})
export class PermissionsSeedModule {}
