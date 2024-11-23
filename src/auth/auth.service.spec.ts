import { Test, TestingModule } from '@nestjs/testing';
import { AuthService_V1_0_0 } from './auth.service';

describe('AuthService', () => {
  let service: AuthService_V1_0_0;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService_V1_0_0],
    }).compile();

    service = module.get<AuthService_V1_0_0>(AuthService_V1_0_0);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
