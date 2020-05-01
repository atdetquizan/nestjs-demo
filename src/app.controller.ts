import { Controller, Get, Logger } from '@nestjs/common';
import { Auth } from './authentication/shared/decorators/auth.decorator';

@Controller()
export class AppController {
    @Get()
    getHome(@Auth() auth: string) {
        Logger.log(auth);
        return { message: 'Hola mundo' };
    }
}
