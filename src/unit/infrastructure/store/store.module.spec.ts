import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StoreModule,
  UseDataSchema,
  UserAdapter,
  UserData,
  UserRepository,
} from '../../../users';

describe('StoreModule', () => {
  let storeModule: StoreModule;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), // Add this line to provide DatabaseConnection
        MongooseModule.forFeature([
          { name: UserData.name, schema: UseDataSchema },
        ]),
        StoreModule,
      ],
      providers: [
        {
          provide: UserRepository,
          useClass: UserAdapter,
        },
      ],
    }).compile();

    storeModule = module.get<StoreModule>(StoreModule);
  });

  it('should be defined', () => {
    expect(storeModule).toBeDefined();
  });

  it('should provide UserRepository', () => {
    const userRepository = module.get<UserRepository>(UserRepository);
    expect(userRepository).toBeInstanceOf(UserAdapter);
  });
});
