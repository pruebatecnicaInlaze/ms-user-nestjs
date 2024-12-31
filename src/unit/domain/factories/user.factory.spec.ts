import { UserFactory, User } from '../../../users';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1234-5678-91011-1213'),
}));

describe('UserFactory', () => {
  it('should create a user instance', () => {
    const fullName = 'John Doe';
    const email = 'john.doe@example.com';
    const user = UserFactory.create(fullName, email);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('1234-5678-91011-1213');
    expect(user.fullName).toBe(fullName);
    expect(user.email).toBe(email);
    expect(user.createAt).toBeInstanceOf(Date);
  });
});
