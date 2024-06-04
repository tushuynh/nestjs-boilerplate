import { ApiProperty } from '@nestjs/swagger';

export class ResponseIdDto {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: '665818974314c76747aca19e',
    required: true,
  })
  _id: string;
}
