import { Injectable, BadGatewayException } from '@nestjs/common';
import { IBaseServiceDefault } from './base-service-default.interface';
import { Repository } from 'typeorm';

/**
 * Injectable
 * @template T
 */
@Injectable()
export class BaseServiceDefault<T> implements IBaseServiceDefault<T> {
    /**
     * Creates an instance of base service default.
     * @param repository Repository<T>
     */
    constructor(private readonly repository: Repository<T>) { }
    /**
     * Creates base service default
     * @param entity T
     * @returns Promise<T>
     */
    create(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.repository
                .save(entity)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    /**
     * Gets all
     * @returns Promise<T[]>
     */
    getAll(params?: any): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.repository
                .find()
                .then((res: T[]) => resolve(res))
                .catch(err => reject(err));
        });
    }
    /**
     * Gets base service default
     * @param id number
     * @returns Promise<T>
     */
    get(id: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.repository
                .findOne(id)
                .then((res: T) => resolve(res))
                .catch(err => reject(err));
        });
    }
    /**
     * Deletes base service default
     * @param id number
     * @returns Promise<boolean>
     */
    delete(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.repository
                .delete(id)
                .then(() => resolve(true))
                .catch(err => reject(err));
        });
    }
    /**
     * Updates base service default
     * @param entity T | any
     * @returns Promise<T>
     */
    update(entity: T | any): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            this.repository
                .findOne(entity.id)
                .then((res: T) => {
                    if (res == null) {
                        reject('NOT EXISTING');
                    }
                    const retrievedEntity: T = Object.assign(res, entity);
                    this.repository
                        .save(retrievedEntity)
                        .then(response => resolve(response))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }
}
