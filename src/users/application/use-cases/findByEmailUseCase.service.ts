import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { User } from '../../domain';
import { UserRepository } from '../ports';
import { EmailUserQuery } from '../query';

@Injectable()
export class FindByEmailUseCase
  implements IUseCase<EmailUserQuery, ResponseBuildingModel<User>>
{
  constructor(private readonly userRegisterRepository: UserRepository) {}
  public execute(
    emailQuery: EmailUserQuery,
  ): Observable<ResponseBuildingModel<User>> {
    return this.userRegisterRepository.findByEmail(emailQuery.email).pipe(
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
