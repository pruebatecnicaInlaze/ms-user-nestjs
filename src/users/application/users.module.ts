import { Module } from '@nestjs/common';
import { UsersController } from '../infrastructure/presentation/http/users.controller';
import { UserInfrastructureModule } from '../infrastructure';
import {
  FindByEmailUseCase,
  FindUserUseCase,
  RegisterUserUseCase,
} from './use-cases';

@Module({
  imports: [UserInfrastructureModule],
  controllers: [UsersController],
  providers: [RegisterUserUseCase, FindUserUseCase, FindByEmailUseCase],
})
export class UsersModule {}
