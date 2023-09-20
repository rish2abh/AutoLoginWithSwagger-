import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class addExcelDto {
  @ApiProperty(
    {
      example : "Johnny Depp"
    }
  )
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty({  type: 'string',  format: 'binary' },)
  urlLimit : string 


}   
export class editExcelDto {
 

  @IsNotEmpty()
  @IsString()
  id: string;

 @IsOptional()
 @IsNotEmpty()
  @IsString()
  name: string;

 @IsOptional()
 @IsNotEmpty()

 @IsString()
  path: string;

  @ApiProperty({  type: 'string',  format: 'binary' },)
 @IsOptional()
 urlLimit : string 

 @IsOptional()
 @IsString()
  key: string;

}   