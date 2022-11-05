import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Double, ManyToOne, JoinColumn} from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'product_inventory' })
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.product_options)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product_id: number;

  @Column()
  combination_option: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}