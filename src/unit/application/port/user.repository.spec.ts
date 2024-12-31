import { of } from 'rxjs';
import { UserRepository } from '../../../../src/users/application/ports/user.repository';
import { User } from '../../../../src/users/domain/user';

class MockUserRepository extends UserRepository {
  findAll() {
    return of([new User('1', 'John Doe', 'john.doe@example.com', new Date())]);
  }
  findByEmail(email: string) {
    return of(new User('1', 'John Doe', 'john.doe@example.com', new Date()));
  }
  save(user: User) {
    return of(user);
  }
}

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
  });

  it('should find all users', (done) => {
    userRepository.findAll().subscribe((users) => {
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
      expect(users[0].fullName).toBe('John Doe');
      done();
    });
  });

  it('should find user by email', (done) => {
    const email = 'john.doe@example.com';
    userRepository.findByEmail(email).subscribe((user) => {
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      done();
    });
  });

  it('should save a user', (done) => {
    const user = new User('2', 'Jane Doe', 'jane.doe@example.com', new Date());
    userRepository.save(user).subscribe((savedUser) => {
      expect(savedUser).toBeDefined();
      expect(savedUser.id).toBe('2');
      expect(savedUser.fullName).toBe('Jane Doe');
      done();
    });
  });
});
