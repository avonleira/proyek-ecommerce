import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { ProductOption } from './ProductOption';

@Entity({ name: 'product_option_value' })
export class ProductOptionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => ProductOption, (productOption) => productOption.product_option_values)
  @JoinColumn({name: 'product_option_id', referencedColumnName: 'id'})
  product_option_id: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}