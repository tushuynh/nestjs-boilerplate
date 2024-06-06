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
import { ApiTags } from '@nestjs/swagger';
import { UserDefaultDto } from '../dtos/user.default.dto';
import { TransformDataInterceptor } from '@common/response/interceptors/transform.data.interceptor';
import { ResponseDoc } from '@common/response/decorators/response.decorator';

@ApiTags('Users')
@Controller({
  version: '1',
  path: '/users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseDoc({ data: UserDefaultDto, isArray: true })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(UserDefaultDto))
  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }

  @ResponseDoc({ data: UserDefaultDto })
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
