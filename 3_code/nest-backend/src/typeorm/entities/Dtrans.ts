import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, IsNull, ManyToMany, JoinTable, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import { Cart } from './Cart';
import { Htrans } from './Htrans';
import { Product } from './Product';
import { ProductInventory } from './ProductInventory';
import { User } from './User';
import { UserAddress } from './UserAddress';
import { Wishlist } from './Wishlist';

@Entity({ name: 'dtrans' })
export class Dtrans {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Htrans, (htrans) => htrans.dtrans)
  @JoinColumn({name: 'htrans_id', referencedColumnName: 'id'})
  htrans: Htrans;

  @ManyToOne(() => Product, (product) => product.dtrans)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product: Product;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @Column({default: "{}"})
  snapshot_product: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}