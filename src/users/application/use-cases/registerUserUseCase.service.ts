import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { User, UserFactory } from '../../domain';
import { UserRepository } from '../ports';
import { RegisterUserCommand } from '../command';

@Injectable()
export class RegisterUserUseCase
  implements IUseCase<User, ResponseBuildingModel<User>>
{
  constructor(private readonly userRegisterRepository: UserRepository) {}
  public execute(
    userRegister: RegisterUserCommand,
  ): Observable<ResponseBuildingModel<User>> {
    const userRegisterFactory = UserFactory.create(
      userRegister.fullName,
      userRegister.email,
    );
    return this.userRegisterRepository.save(userRegisterFactory).pipe(
      map((user) => new ResponseBuildingModel<User>(true, user)),
      catchError((error) =>
        of(
          new ResponseBuildingModel<User>(false, undefined, {
            code: 'INTERNAL_SERVER_ERROR',
            error: error.message,
            title: 'Internal Server Error',
          }),
        ),
      ),
    );
  }
}
