import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull} from 'typeorm';
import { ProductInventory } from './ProductInventory';
import { ProductOption } from './ProductOption';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: true})
  slug: string;

  @Column()
  weight_type: string;

  @Column()
  weight_value: number;

  @OneToMany(() => ProductOption, (productOption) => productOption.product_id)
  product_options: ProductOption[];

  @OneToMany(() => ProductInventory, (productInventory) => productInventory.product_id)
  product_inventory: ProductOption[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}