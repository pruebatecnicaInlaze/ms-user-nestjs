import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { FindByEmailUseCase } from '../../../../src/users/application/use-cases/findByEmailUseCase.service';
import { UserRepository } from '../../../../src/users/application/ports/user.repository';
import { EmailUserQuery } from '../../../../src/users/application/query/emailUser.query';
import { User } from '../../../../src/users/domain/user';

describe('FindByEmailUseCase', () => {
  let findByEmailUseCase: FindByEmailUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByEmailUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    findByEmailUseCase = module.get<FindByEmailUseCase>(FindByEmailUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should return a user when found', (done) => {
    const email = 'john.doe@example.com';
    const user = new User('1', 'John Doe', email, new Date());
    jest.spyOn(userRepository, 'findByEmail').mockReturnValue(of(user));

    findByEmailUseCase
      .execute(new EmailUserQuery(email))
      .subscribe((result) => {
        expect(result).toBeDefined();
        expect(result.succeeded).toBe(true);
        expect(result.result).toBe(user);
        done();
      });
  });

  it('should return an error response when user not found', (done) => {
    const email = 'john.doe@example.com';
    const error = new Error('User not found');
    jest
      .spyOn(userRepository, 'findByEmail')
      .mockReturnValue(throwError(() => error));

    findByEmailUseCase
      .execute(new EmailUserQuery(email))
      .subscribe((result) => {
        expect(result).toBeDefined();
        expect(result.succeeded).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error.code).toBe('INTERNAL_SERVER_ERROR');
        expect(result.error.title).toBe('Internal Server Error');
        done();
      });
  });
});
