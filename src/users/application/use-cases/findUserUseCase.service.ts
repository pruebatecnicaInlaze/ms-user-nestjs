import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { IUseCase, ResponseBuildingModel } from '../../../common';
import { User } from '../../domain';
import { UserRepository } from '../ports';

@Injectable()
export class FindUserUseCase
  implements IUseCase<null, ResponseBuildingModel<User[]>>
{
  constructor(private readonly userRegisterRepository: UserRepository) {}
  public execute(): Observable<ResponseBuildingModel<User[]>> {
    return this.userRegisterRepository.findAll().pipe(
      map((users) => new ResponseBuildingModel<User[]>(true, users)),
      catchError((error) =>
        of(
          new ResponseBuildingModel<User[]>(false, undefined, {
            code: 'INTERNAL_SERVER_ERROR',
            error: error.message,
            title: 'Internal Server Error',
          }),
        ),
      ),
    );
  }
}
