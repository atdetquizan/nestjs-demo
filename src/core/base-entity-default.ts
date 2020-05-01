import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

/**
 * Base entity default
 */
export class BaseEntityDefault {
    /**
     * Primary generated column of base entity default
     */
    @PrimaryGeneratedColumn()
    id: number;
    /**
     * Column  of base entity default
     */
    @Column()
    status: boolean;
    /**
     * Create date column of base entity default
     */
    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    /**
     * Update date column of base entity default
     */
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated?: Date;
}
