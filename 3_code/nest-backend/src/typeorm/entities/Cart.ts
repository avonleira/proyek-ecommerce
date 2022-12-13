import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductInventory } from "./ProductInventory";
import { User } from "./User";

@Entity({name: 'cart'})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @ManyToOne(() => ProductInventory, (productInventory) => productInventory.carts)
  @JoinColumn({name: 'product_inventory_id', referencedColumnName: 'id'})
  product_inventory: ProductInventory;

  @Column()
  qty: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}