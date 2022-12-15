import { Exclude, Transform } from "class-transformer";
export class GeneralSerialization {

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  password: string;

  @Transform(({ value }) => JSON.parse(value).map((image) => `${process.env.END_POINT}/utils/image/${String(image).split('/')[1]}`))
  image_refs: string;

  @Exclude()  
  ref_tok: any;

  combination_option: string;

  constructor(partial: Partial<GeneralSerialization>) {
    Object.assign(this, partial)
  }
}