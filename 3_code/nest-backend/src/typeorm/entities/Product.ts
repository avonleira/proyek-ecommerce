import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import { ProductCategory } from './ProductCategory';
import { ProductInventory } from './ProductInventory';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  slug: string;

  @Column({nullable: true})
  weight: number;

  @ManyToOne(() => ProductCategory, (ProductCategory) => ProductCategory.product)
  @JoinColumn({name: 'product_category_id', referencedColumnName: 'id'})
  @Column({nullable: true})
  product_category_id: number;

  @Column({default: "[]"})
  product_option_refs: string;

  @Column({default: "[]"})
  image_refs: string;

  @Column({default: true})
  is_draft: boolean;

  @OneToMany(() => ProductInventory, (productInventory) => productInventory.product_id)
  product_inventory: ProductInventory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}