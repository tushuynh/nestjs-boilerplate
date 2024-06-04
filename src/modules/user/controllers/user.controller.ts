import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDefaultDto } from '../dtos/user.default.dto';
import { TransformDataInterceptor } from '@common/response/interceptors/transform.data.interceptor';
import { ApiResponse } from '@common/response/decorators/response.decorator';

@ApiTags('Users')
@Controller({
  version: '1',
  path: '/users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse(200, UserDefaultDto, true)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(UserDefaultDto))
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiParam({
    name: 'id',
    example: '665ead953280799183b1a9d0',
  })
  @ApiResponse(200, UserDefaultDto)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(UserDefaultDto))
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
