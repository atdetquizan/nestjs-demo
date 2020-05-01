import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entity';
import { AuthenticationModule } from 'src/authentication';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), AuthenticationModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
