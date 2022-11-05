import { Controller, Get } from '@nestjs/common';

@Controller('admin/master/faq')
export class FaqController {
  @Get()
  test() {
    return 'Hello World!';
  }
}
