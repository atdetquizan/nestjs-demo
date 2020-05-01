import { Column } from 'typeorm';

export class ValidaUserDto {
    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, nullable: true })
    email?: string;
}