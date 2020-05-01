import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super();
    }

    async validate(payload: any) {
        Logger.log(JSON.stringify(payload), 'ERROR=>');
        return { userId: payload.id, username: payload.username };
    }
}
