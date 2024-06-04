import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { RouterModule } from 'src/router/router.module';

@Module({
  imports: [CommonModule, RouterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
