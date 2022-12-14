import { Exclude, Transform } from "class-transformer";
import { GeneralSerialization } from "src/general/GeneralSerialization";

export class SerializedGetAllProducts extends GeneralSerialization{
  id: number;

  title: string;

  description: string;

  @Exclude()
  weight: number;

  product_category_id: number;

  @Exclude()
  product_options: string;

  is_draft: boolean;

  value_options: any

  constructor(partial: Partial<SerializedGetAllProducts>) {
    super(partial);
    Object.assign(this, partial)
  }
}