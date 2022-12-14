import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'wish_list'})
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @ManyToOne(() => Product, (product) => product.wishlists)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}