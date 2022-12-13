import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany} from 'typeorm';
import { Product } from './Product';
import { ProductOptionValue } from './ProductOptionValue';

@Entity({ name: 'product_option' })
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductOptionValue, (productOptionValue) => productOptionValue.product_option_id)
  product_option_values: ProductOptionValue[];

  @Column()
  option_name: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}