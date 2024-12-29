import { User } from '../../../domain';
import { UserData } from '../entities';

export class UserMapper {
  public static toDomain(entity: UserData): User {
    return new User(entity.id, entity.fullName, entity.email, entity.createAt);
  }
  public static toPersistence(domain: User): UserData {
    const newData = new UserData();
    newData.id = domain.id;
    newData.fullName = domain.fullName;
    newData.email = domain.email;
    newData.createAt = domain.createAt;
    return newData;
  }
}
