import { Exclude, Expose, plainToClass, Transform } from "class-transformer";
import { GeneralSerialization } from "src/general/GeneralSerialization";
import { User } from "src/typeorm/entities/User";

export class SerializedAddress extends GeneralSerialization {
  id: number;

  address: string;

  is_default: boolean;

  @Exclude()
  user: User;

  @Expose()
  @Transform(({obj}) => obj?.user?.id)
  user_id: number

  city_id: number;

  constructor(partial: Partial<SerializedAddress>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class SerializedUserAddress {
  id: number;

  address: string;

  is_default: boolean;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  constructor(partial: Partial<SerializedUserAddress>) {
    Object.assign(this, partial)
  }
}