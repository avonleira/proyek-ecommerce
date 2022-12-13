import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
import { UtilsService } from './utils.service';

@Controller()
export class UtilsController {
  constructor(private utilsService: UtilsService){

  }

  @Get('image/:image_id')
  async getImage(@Param('image_id', ParseIntPipe) id: number, @Res() res) {
    const image = await this.utilsService.getImage(id)
    return of(res.sendFile(join(process.cwd(), image.asset_url)))
  }
}
