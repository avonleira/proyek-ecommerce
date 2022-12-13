import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Double, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity({ name: 'product_inventory' })
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  SKU: string;

  @ManyToOne(() => Product, (product) => product.product_inventories)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product: Product;

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

  @OneToMany(() => Cart, (cart) => cart.product_inventory)
  carts: Cart[];
}