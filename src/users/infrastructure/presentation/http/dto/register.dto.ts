import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
