import { RegisterUserCommand } from '../../../../src/users/application/command/registerUser.command';

describe('RegisterUserCommand', () => {
  it('should create an instance with fullName and email', () => {
    const fullName = 'John Doe';
    const email = 'john.doe@example.com';

    const command = new RegisterUserCommand(fullName, email);

    expect(command).toBeDefined();
    expect(command.fullName).toBe(fullName);
    expect(command.email).toBe(email);
  });
});
