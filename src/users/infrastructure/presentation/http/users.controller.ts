import { Body, Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ResponseBuildingModel } from '../../../../common';
import { FindUserUseCase, RegisterUserUseCase } from '../../../application';
import { User } from '../../../domain';
import { RegisterDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  public registerUser(
    @Body() registerUser: RegisterDto,
  ): Observable<ResponseBuildingModel<User>> {
    return this.registerUserUseCase.execute({ registerUser.fullName, });
  }
  @Get('listUsers')
  public findAllUsers(): Observable<ResponseBuildingModel<User[]>> {
    return this.findUserUseCase.execute();
  }
}
