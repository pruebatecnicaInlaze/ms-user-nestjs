import { Module } from '@nestjs/common';
import { UsersModule } from './users';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
