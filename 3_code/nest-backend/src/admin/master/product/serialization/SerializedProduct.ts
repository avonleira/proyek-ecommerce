import { Exclude } from "class-transformer";
import { GeneralSerialization } from "src/abstracts/GeneralSerialization";

export class SerializedProduct extends GeneralSerialization{
  id: number;

  title: string;

  description: string;

  weight: number;

  category_id: number;

  product_option_refs: string;

  image_refs: string;

  @Exclude()
  is_draft: boolean;

  // @Transform(({value}) => new Date(value).toISOString().slice(0,10))
  // date_birth: Date;

  constructor(partial: Partial<SerializedProduct>) {
    super();
    Object.assign(this, partial)
  }
}