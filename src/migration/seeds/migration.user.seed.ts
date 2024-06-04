import { UserService } from '@modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

@Injectable()
export class MigrationUserSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'seed:user',
    describe: 'seed users',
  })
  async seeds(): Promise<void> {
    const password = '123123';

    const user1 = this.userService.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password,
    });

    const user2 = this.userService.create({
      name: 'user',
      email: 'user@gmail.com',
      password,
    });

    try {
      await Promise.all([user1, user2]);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

  @Command({
    command: 'remove:user',
    describe: 'remove users',
  })
  async remove(): Promise<void> {
    try {
      await this.userService.deleteAll();
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
