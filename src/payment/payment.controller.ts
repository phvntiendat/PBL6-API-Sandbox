import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentDto } from "./payment.dto";


@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    async makePayment(@Body(new ValidationPipe()) payment: PaymentDto) {
        return this.paymentService.makePayment(payment);
    }

    @Post('ipn')
    handleIPN(@Body() ipnData: any) {
        // Process the IPN data received in req.body
        console.log('Received IPN:', ipnData);

        // Implement your logic to handle the IPN data

        // Respond to the IPN server with a 200 OK status
        return 'OK';
  }

}
