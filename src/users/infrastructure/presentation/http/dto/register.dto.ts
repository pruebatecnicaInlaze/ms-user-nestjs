import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Hernan Velasquez',
    description: 'The full name of the user',
  })
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'hernan@algo.com',
    description: 'The email of the user',
  })
  public email: string;
}
