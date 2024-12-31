import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { RegisterUserUseCase } from '../../../../src/users/application/use-cases/registerUserUseCase.service';
import { UserRepository } from '../../../../src/users/application/ports/user.repository';
import { RegisterUserCommand } from '../../../../src/users/application/command/registerUser.command';
import { UserFactory } from '../../../users';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should register a user successfully', (done) => {
    const command = new RegisterUserCommand('John Doe', 'john.doe@example.com');
    const user = UserFactory.create(command.fullName, command.email);
    jest.spyOn(userRepository, 'save').mockReturnValue(of(user));

    registerUserUseCase.execute(command).subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.succeeded).toBe(true);
      expect(result.result).toBe(user);
      done();
    });
  });

  it('should return an error response when registration fails', (done) => {
    const command = new RegisterUserCommand('John Doe', 'john.doe@example.com');
    const error = new Error('Internal Server Error');
    jest.spyOn(userRepository, 'save').mockReturnValue(throwError(() => error));

    registerUserUseCase.execute(command).subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.succeeded).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe('INTERNAL_SERVER_ERROR');
      expect(result.error.title).toBe('Internal Server Error');
      done();
    });
  });
});
