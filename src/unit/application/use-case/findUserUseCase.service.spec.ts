import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { FindUserUseCase } from '../../../../src/users/application/use-cases/findUserUseCase.service';
import { UserRepository } from '../../../../src/users/application/ports/user.repository';
import { User } from '../../../../src/users/domain/user';

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should return a list of users', (done) => {
    const users = [
      new User('1', 'John Doe', 'john.doe@example.com', new Date()),
    ];
    jest.spyOn(userRepository, 'findAll').mockReturnValue(of(users));

    findUserUseCase.execute().subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.succeeded).toBe(true);
      expect(result.result).toBe(users);
      done();
    });
  });

  it('should return an error response when an error occurs', (done) => {
    const error = new Error('Internal Server Error');
    jest
      .spyOn(userRepository, 'findAll')
      .mockReturnValue(throwError(() => error));

    findUserUseCase.execute().subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.succeeded).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe('INTERNAL_SERVER_ERROR');
      expect(result.error.title).toBe('Internal Server Error');
      done();
    });
  });
});
