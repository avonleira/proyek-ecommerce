import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'image'})
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asset_url: string;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  alt: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}