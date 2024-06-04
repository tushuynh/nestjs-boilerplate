import { ResponseIdDto } from '@common/response/dtos/response.id.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserDefaultDto extends ResponseIdDto {
  @ApiProperty({
    example: 'user',
  })
  name: string;

  @ApiProperty({
    example: 'user@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: false,
  })
  emailVerified: boolean;

  @Exclude()
  password: string;

  @ApiProperty({
    example: 'imageName.jpg',
  })
  image: string;

  @ApiProperty({
    example: '0123456789',
  })
  mobileNumber: string;

  @ApiProperty({
    example: '2024/06/01 00:00',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024/06/02 00:00',
  })
  updatedAt: string;
}
