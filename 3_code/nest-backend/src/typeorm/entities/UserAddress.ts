import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_address' })
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_code: string;

  @Column()
  address: string;

  @Column()
  is_default: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}