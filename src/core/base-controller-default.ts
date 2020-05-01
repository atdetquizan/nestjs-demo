import { IBaseServiceDefault } from './base-service-default.interface';
import { AuthGuard } from '@nestjs/passport';
import { Put, UseGuards, Delete, Get, Post, Body, Param } from '@nestjs/common';
/**
 * Base controller default
 * @template T
 */
export class BaseControllerDefault<T> {
    /**
     * Creates an instance of base controller default.
     * @param baseServiceDefault IBaseServiceDefault
     */
    constructor(private readonly baseServiceDefault: IBaseServiceDefault<T>) { }
    /**
     * Get all the registered data
     */
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<T[]> {
        return this.baseServiceDefault.getAll();
    }

    /**
     * Get registration by Id
     * @param id
     */
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findById(@Param('id') id: number): Promise<T> {
        return this.baseServiceDefault.get(id);
    }

    /**
     * Save record by entity
     * @param entity T
     */
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() entity: T): Promise<T> {
        return this.baseServiceDefault.create(entity);
    }

    /**
     * Delete record by Id
     * @param id number
     */
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: number) {
        this.baseServiceDefault.delete(id);
    }

    /**
     * Update record by object
     * @param entity T
     */
    @Put()
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() entity: T): Promise<T> {
        return this.baseServiceDefault.update(entity);
    }
}
