import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Dtrans } from "./Dtrans";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'review'})
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  user: User;

  @OneToOne(() => Dtrans, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  dtrans: Dtrans;

  @ManyToOne(() => Product, (product) => product.reviews, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
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