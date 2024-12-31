import { User, UserData, UserMapper } from '../../../../users';

describe('UserMapper', () => {
  it('should map UserData to User', () => {
    const userData: UserData = {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      createAt: new Date(),
    };

    const user = UserMapper.toDomain(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(userData.id);
    expect(user.fullName).toBe(userData.fullName);
    expect(user.email).toBe(userData.email);
    expect(user.createAt).toBe(userData.createAt);
  });

  it('should map User to UserData', () => {
    const user = new User('1', 'John Doe', 'john.doe@example.com', new Date());

    const userData = UserMapper.toPersistence(user);

    expect(userData).toBeInstanceOf(UserData);
    expect(userData.id).toBe(user.id);
    expect(userData.fullName).toBe(user.fullName);
    expect(userData.email).toBe(user.email);
    expect(userData.createAt).toBe(user.createAt);
  });
});
