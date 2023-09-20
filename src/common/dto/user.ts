import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDTO {
  @ApiProperty({ example:"johnny@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({
    example : "Johnny Depp"
  })
  @IsString()
  name: string;

  @ApiProperty({
    example : "<PASSWORD>"
  })
  @IsString()
  password: string;
}

export class User_Edit_DTO {
  @ApiProperty({
    example : "_id"
  })
  @IsString()
  id:string

 
  @ApiProperty({
   example : "Johnny Depp"
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
   example : "<PASSWORD>"
  })
  @IsString()
  @IsOptional()
  password: string;
 
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive:boolean
}
