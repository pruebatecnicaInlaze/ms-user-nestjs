import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UseDataSchema, UserData, UserDataDocument } from '../../../../users';

describe('UserData', () => {
  let userModel: Model<UserDataDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), // Add this line to configure the database connection
        MongooseModule.forFeature([
          { name: UserData.name, schema: UseDataSchema },
        ]),
      ],
    }).compile();

    userModel = module.get<Model<UserDataDocument>>(
      getModelToken(UserData.name),
    );
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });
});
