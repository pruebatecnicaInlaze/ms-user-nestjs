import { v4 as UUID } from 'uuid';
import { User } from '../user';

export class UserFactory {
  public static create(fullName: string, email: string) {
    const userId = UUID();
    const createAt = new Date();

    return new User(userId, fullName, email, createAt);
  }
}
