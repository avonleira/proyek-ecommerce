import { Exclude, plainToClass, Transform } from "class-transformer";

export class SerializedRegister {
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

  constructor(partial: Partial<SerializedRegister>) {
    Object.assign(this, partial)
  }
}