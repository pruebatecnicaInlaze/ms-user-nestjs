import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserAdapter, UserData, UserMapper } from '../../../../users';

const mockUserModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UserAdapter', () => {
  let userAdapter: UserAdapter;
  let userModel: Model<UserData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdapter,
        {
          provide: getModelToken(UserData.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userAdapter = module.get<UserAdapter>(UserAdapter);
    userModel = module.get<Model<UserData>>(getModelToken(UserData.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userAdapter).toBeDefined();
  });

  it('should find all users', (done) => {
    const usersData: UserData[] = [
      {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        id: '1',
        createAt: new Date(),
      },
    ];
    const users = usersData.map(UserMapper.toDomain);
    jest.spyOn(userModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(usersData),
    } as any);

    userAdapter.findAll().subscribe((result) => {
      expect(result).toEqual(users);
      done();
    });
  });

  it('should find user by email', (done) => {
    const userData: UserData = {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      createAt: new Date(),
    };
    const user = UserMapper.toDomain(userData);
    jest.spyOn(userModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue([userData]),
    } as any);

    userAdapter.findByEmail('john.doe@example.com').subscribe((result) => {
      expect(result).toEqual(user);
      done();
    });
  });

  it('should save a user', (done) => {
    const user = new User('1', 'John Doe', 'john.doe@example.com', new Date());
    const userData = UserMapper.toPersistence(user);
    jest.spyOn(userModel, 'create').mockResolvedValue(
      Promise.resolve({
        ...userData,
      }) as any,
    );

    userAdapter.save(user).subscribe((result) => {
      expect(result).toEqual(UserMapper.toDomain(userData));
      done();
    });
  });
});
