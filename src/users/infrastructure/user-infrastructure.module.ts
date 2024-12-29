import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../../config';
@Module({
  imports: [MongooseModule.forRoot(environment.mongodbUrl)],
  exports: [MongooseModule],
})
export class UserInfrastructureModule {}
