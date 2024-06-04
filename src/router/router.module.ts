import { UserController } from '@modules/user/controllers/user.controller';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [],
})
export class RouterModule {}
