import { Module } from '@nestjs/common';
import { UsersController, UserInfrastructureModule } from '../infrastructure';
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
