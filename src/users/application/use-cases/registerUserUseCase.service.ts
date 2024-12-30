import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { User } from '../../domain';
import { UserRepository } from '../ports';

@Injectable()
export class RegisterUserUseCase
  implements IUseCase<User, ResponseBuildingModel<User>>
{
  constructor(private readonly userRegisterRepository: UserRepository) {}
  public execute(userRegister: User): Observable<ResponseBuildingModel<User>> {
    return this.userRegisterRepository.save(userRegister).pipe(
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
