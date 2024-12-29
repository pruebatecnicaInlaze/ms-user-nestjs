import { Module } from '@nestjs/common';
import { UsersController } from '../infrastructure/presentation/http/users.controller';
import { UserInfrastructureModule } from '../infrastructure';

@Module({
  imports: [UserInfrastructureModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
