import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';

import { UserRepository } from '../../../application';
import { User } from '../../../domain';
import { UserData } from '../entities';
import { UserMapper } from '../mappers';

@Injectable()
export class UserAdapter implements UserRepository {
  constructor(
    @InjectModel(UserData.name) private readonly userModel: Model<UserData>,
  ) {}
  public findAll(): Observable<User[]> {
    return from(this.userModel.find().exec()).pipe(
      map((usersSaved) => usersSaved.map(UserMapper.toDomain)),
    );
  }
  public findByEmail(email: string): Observable<User> {
    return from(this.userModel.find({ email }).exec()).pipe(
      map((userSaved) => UserMapper.toDomain(userSaved[0])),
    );
  }
  public save(user: User): Observable<User> {
    const userMapper = UserMapper.toPersistence(user);
    return from(this.userModel.create(userMapper)).pipe(
      map((user) => UserMapper.toDomain(user)),
    );
  }
}
