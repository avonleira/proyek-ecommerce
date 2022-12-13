import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull, ManyToMany, JoinTable} from 'typeorm';
import { Product } from './Product';
import { ProductInventory } from './ProductInventory';

@Entity({ name: 'product_category' })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  level: number;

  @OneToMany(() => Product, (Product) => Product.product_category_id)
  product: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}