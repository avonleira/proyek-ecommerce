import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'product_view'})
export class ProductView {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.product_views, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  user: User;

  @ManyToOne(() => Product, (product) => product.product_views, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}