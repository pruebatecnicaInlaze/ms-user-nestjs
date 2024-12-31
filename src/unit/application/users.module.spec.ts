import { Test, TestingModule } from '@nestjs/testing';
import {
  FindByEmailUseCase,
  FindUserUseCase,
  RegisterUserUseCase,
  UserInfrastructureModule,
  UsersController,
  UsersModule,
} from '../../users';

describe('UsersModule', () => {
  let usersModule: UsersModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserInfrastructureModule, UsersModule],
      controllers: [UsersController],
      providers: [RegisterUserUseCase, FindUserUseCase, FindByEmailUseCase],
    }).compile();

    usersModule = module.get<UsersModule>(UsersModule);
  });

  it('should be defined', () => {
    expect(usersModule).toBeDefined();
  });
});
