import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import { Cart } from './Cart';
import { Dtrans } from './Dtrans';
import { ProductCategory } from './ProductCategory';
import { ProductInventory } from './ProductInventory';
import { ProductView } from './ProductView';
import { Review } from './Review';
import { Wishlist } from './Wishlist';

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

  @ManyToOne(() => ProductCategory, (ProductCategory) => ProductCategory.products, {nullable: true, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  product_category: ProductCategory;

  @Column({default: "[]"})
  product_options: string;

  @Column({default: "[]"})
  image_refs: string;

  @Column({default: true})
  is_draft: boolean;

  @OneToMany(() => ProductInventory, (productInventory) => productInventory.product)
  product_inventories: ProductInventory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => Dtrans, (dtrans) => dtrans.product)
  dtrans: Dtrans[];

  @OneToMany(() => ProductView, (product_view) => product_view.product)
  product_views: ProductView[];
}