import { User } from '../../../src/users/domain/user';

describe('User', () => {
  it('should create a user instance', () => {
    const id = '1';
    const fullName = 'John Doe';
    const email = 'john.doe@example.com';
    const createAt = new Date();

    const user = new User(id, fullName, email, createAt);

    expect(user).toBeDefined();
    expect(user.id).toBe(id);
    expect(user.fullName).toBe(fullName);
    expect(user.email).toBe(email);
    expect(user.createAt).toBe(createAt);
  });
});
