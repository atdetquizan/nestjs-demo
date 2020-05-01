import { Column } from 'typeorm';
export class CreateUserDto {
  
    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, nullable: true })
    password: string | undefined;
    
    @Column({ nullable: true })
    status: boolean;
}
