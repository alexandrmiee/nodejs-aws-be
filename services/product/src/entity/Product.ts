import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import {
    validateOrReject, IsDefined,
} from 'class-validator';

import {Stock} from './Stock';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    @IsDefined()
    title: string;

    @Column()
    description: string;

    @Column({type: 'integer'})
    price: number;

    @OneToOne(()=> Stock, stock => stock.product)
    stock: Stock;

    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this);
    }
}
