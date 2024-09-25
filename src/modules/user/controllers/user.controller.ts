import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDefaultDto } from '../dtos/user.default.dto';
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
  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }

  @ResponseDoc({ data: UserDefaultDto })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
