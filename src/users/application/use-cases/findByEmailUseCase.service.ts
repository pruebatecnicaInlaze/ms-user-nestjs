import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { User } from '../../domain';
import { UserRepository } from '../ports';

@Injectable()
export class FindByEmailUseCase
  implements IUseCase<string, ResponseBuildingModel<User>>
{
  constructor(private readonly userRegisterRepository: UserRepository) {}
  public execute(email: string): Observable<ResponseBuildingModel<User>> {
    return this.userRegisterRepository.findByEmail(email).pipe(
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
