import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'review'})
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  // @Column()
  // dtrans: Dtrans;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product: Product;

  @Column()
  rating: number;

  @Column()
  review: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}