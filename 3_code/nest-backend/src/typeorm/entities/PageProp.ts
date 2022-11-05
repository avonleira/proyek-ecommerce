import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany } from 'typeorm';

@Entity({ name: 'page_prop' })
export class PageProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  path: string;

  @Column()
  title: string;

  @Column()
  metas: string;

  @Column()
  links: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}