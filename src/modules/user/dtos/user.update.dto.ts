import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    example: 'user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'user@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    example: '2024/05/30 00:00',
    required: false,
  })
  @IsDate()
  @IsOptional()
  emailVerified?: boolean;

  @ApiProperty({
    example: 'password',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    example: 'image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: '0398884444',
    required: false,
  })
  @IsString()
  @Length(10)
  mobileNumber?: string;
}
