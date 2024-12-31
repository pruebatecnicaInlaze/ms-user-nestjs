import { EmailUserQuery } from '../../../../src/users/application/query/emailUser.query';

describe('EmailUserQuery', () => {
  it('should create an instance with email', () => {
    const email = 'john.doe@example.com';

    const query = new EmailUserQuery(email);

    expect(query).toBeDefined();
    expect(query.email).toBe(email);
  });
});
