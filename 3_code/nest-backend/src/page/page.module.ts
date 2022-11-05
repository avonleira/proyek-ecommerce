import { Module } from '@nestjs/common';
import { PageController } from './controllers/page/page.controller';
import { PageService } from './services/page/page.service';

@Module({
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
