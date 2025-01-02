import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { ExampleDocsOpenApi } from '../../../../constants';
@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findByEmailUseCase: FindByEmailUseCase,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The list of successfully register users',
    example: ExampleDocsOpenApi.successListAllUsers,
  })
  @Get('listUsers')
  public findAllUsers(): Observable<ResponseBuildingModel<User[]>> {
    return this.findUserUseCase.execute();
  }

  @Get('findUserByEmail/:email')
  @ApiQuery({
    name: 'email',
    required: true,
    type: 'string',
    example: 'hernan@example.com',
  })
  @ApiResponse({
    status: 201,
    description: 'The user successfully found by email',
    example: ExampleDocsOpenApi.successByEmailUser,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found by email',
    example: ExampleDocsOpenApi.errorNotFoundUser,
  })
  public findByEmail(
    @Param('email') email: string,
  ): Observable<ResponseBuildingModel<User>> {
    return this.findByEmailUseCase.execute(new EmailUserQuery(email));
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user successfully registered',
    example: ExampleDocsOpenApi.registerSuccess,
  })
  public registerUser(
    @Body() registerUser: RegisterDto,
  ): Observable<ResponseBuildingModel<User>> {
    return this.registerUserUseCase.execute(
      new RegisterUserCommand(registerUser.fullName, registerUser.email),
    );
  }
}
