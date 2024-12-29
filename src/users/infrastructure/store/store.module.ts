import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRepository } from '../../application';
import { UserAdapter } from './adapter';
import { UseDataSchema, UserData } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserData.name, schema: UseDataSchema }]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
  ],
  exports: [UserRepository, MongooseModule],
})
export class StoreModule {}
