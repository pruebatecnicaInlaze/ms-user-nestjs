import { Observable } from 'rxjs';
import { User } from '../../domain';

export abstract class UserRepository {
  abstract findAll(): Observable<User[]>;
  abstract findByEmail(email: string): Observable<User>;
  abstract save(user: User): Observable<User>;
}
