import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../../config';
import { StoreModule } from './store';
@Module({
  imports: [MongooseModule.forRoot(environment.mongodbUrl), StoreModule],
  exports: [MongooseModule, StoreModule],
})
export class UserInfrastructureModule {}
