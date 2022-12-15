import { Controller, Get } from '@nestjs/common';
import { MidtransService } from '../../service/midtrans/midtrans.service';

@Controller('midtrans')
export class MidtransController {
    constructor(
        private midtransService: MidtransService
    ){}
}
