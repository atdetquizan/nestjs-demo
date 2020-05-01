import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/settings/entity';

@Injectable()
export class AuthenticationService {
    /**
     * Creates an instance of authentication service.
     * @param jwtService JwtService
     */
    constructor(private readonly jwtService: JwtService) {}

    /**
     * Token generation with user information
     * @param user
     */
    async createToken(user: Users) {
        const payload = {
            id: user.id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // email: user.email,
            username: user.username,
        };
        return {
            ...payload,
            access_token: this.jwtService.sign(payload),
        };
    }
    /**
     * Decodes token
     * @param token string
     * @returns  any
     */
    async decodeToken(token: string) {
        return this.jwtService.verify(token);
    }
}
