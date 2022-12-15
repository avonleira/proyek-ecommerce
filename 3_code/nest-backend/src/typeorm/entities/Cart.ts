import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductInventory } from "./ProductInventory";
import { User } from "./User";

@Entity({name: 'cart'})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  user: User;

  @ManyToOne(() => ProductInventory, (productInventory) => productInventory.carts, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  product_inventory: ProductInventory;

  @Column()
  qty: number;

  @Column({nullable: true})
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}