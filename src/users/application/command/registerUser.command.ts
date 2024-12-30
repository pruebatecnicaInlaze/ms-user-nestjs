export class RegisterUserCommand {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
  ) {}
}
