import { Exclude, Expose, Transform } from "class-transformer";
import { GeneralSerialization } from "src/general/GeneralSerialization";

export class SerializedGetProduct extends GeneralSerialization{
  id: number;

  title: string;

  description: string;

  weight: number;

  category_id: number;

  is_draft: boolean;

  product_options: any;

  constructor(partial: Partial<SerializedGetProduct>) {
    super(partial);
    Object.assign(this, partial)
  }
}