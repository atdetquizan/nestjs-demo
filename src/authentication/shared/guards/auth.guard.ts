import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const bearerToken: string = request.headers.authorization;
        if (bearerToken) {
            const user = this.jwtService.verify(
                bearerToken.replace('Bearer ', ''),
            );
            if (user) {
                request.auth = user;
                Logger.log(request.auth, 'bearerToken');
            }
        }
        return true;
    }
}
