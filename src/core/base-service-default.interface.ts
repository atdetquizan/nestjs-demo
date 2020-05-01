export interface IBaseServiceDefault<T> {
    create(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    delete(id: number);
}
