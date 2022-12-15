import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { Expose, Transform, Type } from "class-transformer";
import { GeneralSerialization } from "src/general/GeneralSerialization";

@UseInterceptors(ClassSerializerInterceptor)
export class SerializedCheckout extends GeneralSerialization {

  @Expose()
  @Transform(({obj}) => obj.item.reduce((a, b) => a + (b?.qty * b?.product_inventory?.price), 0))
  grand_total?: number

  @Expose()
  @Transform(({value}) => value.map((value) => new SerializedCheckoutItem(value)))
  @Type(() => SerializedCheckoutItem)
  item: SerializedCheckoutItem[];

  constructor(partial: Partial<SerializedCheckout>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class SerializedCheckoutItem extends GeneralSerialization {
  id: number;

  qty: number;

  @Expose()
  @Transform(({obj}) => obj.qty * obj.product_inventory.price)
  sub_total: number;

  @Expose({name: 'product'})
  @Type(() => GeneralSerialization)
  @Transform(({obj}) => new GeneralSerialization(obj.product_inventory))
  product_inventory: any;

  constructor(partial: Partial<SerializedCheckoutItem>) {
    super(partial)
    Object.assign(this, partial)
  }
}