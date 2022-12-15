import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Htrans } from './Htrans';
import { PreCheckout } from './PreCheckout';
import { User } from './User';

@Entity({ name: 'user_address' })
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({default: false})
  is_default: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @Column()
  city_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Htrans, (htrans) => htrans.user)
  htrans: Htrans[];
}