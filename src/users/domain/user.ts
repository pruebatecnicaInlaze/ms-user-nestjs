import { UserInterface } from './interface';

export class User implements UserInterface {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public createAt: Date,
  ) {}
}
