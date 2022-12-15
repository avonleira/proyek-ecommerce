import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull, ManyToMany, JoinTable, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import { Dtrans } from './Dtrans';
import { User } from './User';
import { UserAddress } from './UserAddress';

@Entity({ name: 'htrans' })
export class Htrans {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.htrans, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  user: User;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.htrans, {nullable: false, eager: true})
  @JoinColumn({referencedColumnName: 'id'})
  userAddress: UserAddress;

  @Column()
  total_barang: number;

  @Column()
  ongkir: number;

  @Column({default: 0, comment: '0: Menunggu pembayaran, 1: Sedang di proses, 2: Dikirim, 3: Pesanan selesai'})
  order_status: number;

  @Column({default: 0, comment: '0: pending, 1: success, 2: cancelled, 3: expired'}) 
  payment_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Dtrans, (dtrans) => dtrans.htrans)
  dtrans: Dtrans[];
}