import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { UserAddress } from "./UserAddress";

@Entity({name: 'pre_checkout'})
export class PreCheckout{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @OneToOne(() => UserAddress)
  @JoinColumn({name: 'user_address_id', referencedColumnName: 'id'})
  user_address: UserAddress;

  @Column({nullable: true})
  shipment: string; //json

  @Column({nullable: true})
  voucher: string; //voucher yang di checked

  @Column({nullable: false})
  cart_refs: string; //cart id dengan tambahan property is_checked

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}