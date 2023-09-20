import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsBoolean } from 'class-validator';

export class LoginDTO {
  @ApiProperty(
    {
      example:"abcd@gmail.com"
    }
  )
  @IsEmail()
  email: string;

  @ApiProperty({
    example:'<PASSWORD>'
  })
  @IsString()
  password: string;

//   @IsBoolean()
//   isRemember: boolean;
}   