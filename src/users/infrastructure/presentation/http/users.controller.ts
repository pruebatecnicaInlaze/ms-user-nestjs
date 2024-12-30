import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ResponseBuildingModel } from '../../../../common';
import {
  FindByEmailUseCase,
  FindUserUseCase,
  RegisterUserUseCase,
  RegisterUserCommand,
  EmailUserQuery,
} from '../../../application';
import { User } from '../../../domain';
import { RegisterDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findByEmailUseCase: FindByEmailUseCase,
  ) {}

  @Get('listUsers')
  public findAllUsers(): Observable<ResponseBuildingModel<User[]>> {
    return this.findUserUseCase.execute();
  }

  @Get('findUserByEmail/:email')
  public findByEmail(
    @Param('email') email: string,
  ): Observable<ResponseBuildingModel<User>> {
    return this.findByEmailUseCase.execute(new EmailUserQuery(email));
  }

  @Post('register')
  public registerUser(
    @Body() registerUser: RegisterDto,
  ): Observable<ResponseBuildingModel<User>> {
    return this.registerUserUseCase.execute(
      new RegisterUserCommand(registerUser.fullName, registerUser.email),
    );
  }
}
