import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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
}