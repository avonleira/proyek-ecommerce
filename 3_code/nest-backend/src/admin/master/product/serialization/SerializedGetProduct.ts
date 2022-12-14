import { Exclude, Expose, Transform } from "class-transformer";
import { GeneralSerialization } from "src/general/GeneralSerialization";

export class SerializedGetProduct extends GeneralSerialization{
  id: number;

  title: string;

  description: string;

  weight: number;

  category_id: number;

  is_draft: boolean;

  @Exclude()
  product_options: string;

  @Expose({name: "product_category"})
  @Transform(({value}) => new GeneralSerialization(value))
  product_category_id: any;

  constructor(partial: Partial<SerializedGetProduct>) {
    super(partial);
    Object.assign(this, partial)
  }
}