import { Exclude, plainToClass, Transform } from "class-transformer";

export class SerializedProfile {
  id: number;

  email: string;

  @Exclude()
  password: string;

  first_name: string;

  last_name: string;

  gender: string;

  phone_number: string;

  @Transform(({value}) => new Date(value).toISOString().slice(0,10))
  date_birth: Date;

  profile_picture: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Transform(({value}) => value.map((address) => plainToClass(SerializedUserAddress, address)))
  addresses: SerializedUserAddress[];

  constructor(partial: Partial<SerializedProfile>) {
    Object.assign(this, partial)
  }
}

export class SerializedUserAddress {
  id: number;

  post_code: string;

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