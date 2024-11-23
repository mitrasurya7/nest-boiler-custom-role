import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RolesSeedService } from './roles/roles-seed.service';
import { RolePermissionsSeedService } from './role-permissions/role-permissions-seed.service';
import { UsersSeedService } from './users/users-seed.service';
import { PermissionsSeedService } from './permissions/permissions-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(RolesSeedService).run(); // Harus dipanggil lebih awal jika terkait dengan role
  await app.get(PermissionsSeedService).run();
  await app.get(UsersSeedService).run();
  await app.get(RolePermissionsSeedService).run();

  await app.close();
};

void runSeed();
