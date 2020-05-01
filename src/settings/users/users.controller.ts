import {
    Controller,
    Body,
    Post,
    Get,
    UseGuards,
    Headers,
    Logger,
    HttpStatus,
    Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos';
import { Users } from '../entity';
import { JwtAuthGuard } from 'src/authentication/shared/guards/jwt-auth.guard';
import { LocalStrategy } from 'src/authentication/shared';
import { LoginAuthDto } from 'src/authentication/dtos';
import { AuthenticationService } from 'src/authentication';
import { Auth } from 'src/authentication/shared/decorators/auth.decorator';

@Controller('users')
export class UsersController {
    /**
     * Creates an instance of user controller.
     * @param userService UserService
     */
    constructor(
        private readonly auhenticationService: AuthenticationService,
        private readonly usersService: UsersService,
    ) {}
    /**
     * Authenticación JWT
     * @param res any
     * @param loginAuthDto LoginAuthDto
     * @returns any
     */
    @UseGuards(LocalStrategy)
    @Post('/auth')
    async login(@Response() res: any, @Body() loginAuthDto: LoginAuthDto) {
        /**
         * Validation if is username and password not empty
         */
        if (!(loginAuthDto.username && loginAuthDto.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Se requiere nombre de usuario y contraseña!',
            });
        }
        /**
         * Get user by username
         */
        const user = await this.usersService.getByUsername(
            loginAuthDto.username,
        );
        /**
         * Validation if exits user
         */
        if (user) {
            /**
             * Compared password if equals
             */
            if (
                await this.usersService.compareHash(
                    user.password,
                    loginAuthDto.password,
                )
            ) {
                /**
                 * Return if user is correct
                 */
                return res
                    .status(HttpStatus.OK)
                    .json(await this.auhenticationService.createToken(user));
            }
        }
        /**
         * Return if user is incorrect
         */
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ message: '¡Nombre de usuario o contraseña incorrectos!' });
    }
    /**
     * Posts user controller
     * @param createUserDto
     * @returns Promise<User>
     */
    @Post()
    async insert(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.insert(createUserDto);
    }
    /**
     * Uses guards
     * @param auth any
     * @returns Promise<Users[]>
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    // @UseGuards()
    async getAll(@Auth() auth: any): Promise<Users[]> {
        return this.usersService.getAll();
    }
}
