import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";
import {Product} from'./Product';

@Entity('stock')
export class Stock {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => Product, product => product.stock)
    @JoinColumn()
    product: Product;

    @Column({type: 'integer'})
    count: number;
}
