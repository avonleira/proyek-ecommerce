import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Double, ManyToOne, JoinColumn} from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'product_inventory' })
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  SKU: string;

  @ManyToOne(() => Product, (product) => product.product_inventory)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product_id: number;

  @Column()
  combination_option: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column({default: '[]'})
  image_refs: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}