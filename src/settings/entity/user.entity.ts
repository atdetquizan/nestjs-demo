import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityDefault } from 'src/core';

@Entity()
export class Users extends BaseEntityDefault {
    @Column({ length: 100 })
    username: string;

    @Column({ length: 100 })
    password: string;
}
