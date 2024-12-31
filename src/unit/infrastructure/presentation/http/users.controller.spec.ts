import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseBuildingModel } from '../../../../common';
import {
  UsersController,
  RegisterUserUseCase,
  FindUserUseCase,
  FindByEmailUseCase,
  User,
  RegisterDto,
} from '../../../../users';

describe('UsersController', () => {
  let usersController: UsersController;
  let registerUserUseCase: RegisterUserUseCase;
  let findUserUseCase: FindUserUseCase;
  let findByEmailUseCase: FindByEmailUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    findByEmailUseCase = module.get<FindByEmailUseCase>(FindByEmailUseCase);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a user successfully', (done) => {
      const registerDto: RegisterDto = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
      };
      const user = new User(
        '1',
        'John Doe',
        'john.doe@example.com',
        new Date(),
      );
      const response = new ResponseBuildingModel<User>(true, user);
      jest.spyOn(registerUserUseCase, 'execute').mockReturnValue(of(response));

      usersController.registerUser(registerDto).subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
    });
  });

  describe('findAllUsers', () => {
    it('should return a list of users', (done) => {
      const users = [
        new User('1', 'John Doe', 'john.doe@example.com', new Date()),
      ];
      const response = new ResponseBuildingModel<User[]>(true, users);
      jest.spyOn(findUserUseCase, 'execute').mockReturnValue(of(response));

      usersController.findAllUsers().subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', (done) => {
      const email = 'john.doe@example.com';
      const user = new User('1', 'John Doe', email, new Date());
      const response = new ResponseBuildingModel<User>(true, user);
      jest.spyOn(findByEmailUseCase, 'execute').mockReturnValue(of(response));

      usersController.findByEmail(email).subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
    });
  });
});
