import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ValidaUserDto } from '../dtos';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}
    async getAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }
    /**
     * Inserts user service
     * @param user CreateUserDto
     * @returns Promise<Users>
     */
    async insert(user: CreateUserDto): Promise<Users> {
        if (!(await this.getUserExists(user))) {
            user.password = await this.getHash(user.password);
            return new Promise<Users>((resolve, reject) => {
                this.usersRepository
                    .save(user)
                    .then((created: Users) => resolve(created))
                    .catch(err => reject(err));
            });
        }
    }
    /**
     * Gets by username
     * @param username
     * @returns Promise<Users>
     */
    async getByUsername(username: string): Promise<Users> {
        return await this.usersRepository.findOne({ username });
    }
    /**
     * Compares hash
     * @param password string
     * @param hash string
     * @returns Promise<boolean>
     */
    async compareHash(password: string, hash: string): Promise<boolean> {
        // return bcrypt.compare(hash, password);
        return password === hash;
    }
    /**
     * Gets hash
     * @param password string
     * @returns Promise<string>
     */
    async getHash(password: string): Promise<string> {
        // return bcrypt.hash(password, this.saltRounds);
        return password;
    }
    /**
     * Validar usuario por: Username, Email
     * Retornamos un valor BOOLEAN para verificar existencia de usuario
     * @param user
     */
    async getUserExists(user: ValidaUserDto): Promise<boolean> {
        const findUser = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username: user.username })
            .getOne();

        if (findUser) {
            if (findUser.username === user.username) {
                throw new BadGatewayException(
                    'El nombre del usuario ya se encuentra registrado',
                );
            }
            // else if (findUser.email === user.email) {
            //     throw new BadGatewayException(
            //         'El correo electronico ingresado ya se encuentra registrado',
            //     );
            // }
        }
        return findUser ? true : false;
    }
}
