import { Test, TestingModule } from '@nestjs/testing';
import { UsersService_V1_0_0 } from './users.service';

describe('UsersService', () => {
  let service: UsersService_V1_0_0;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService_V1_0_0],
    }).compile();

    service = module.get<UsersService_V1_0_0>(UsersService_V1_0_0);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
