import { Exclude, plainToClass, Transform } from "class-transformer";

export class SerializedAuthUser {
  @Exclude()
  id: number;

  email: string;

  @Exclude()
  password: string;

  first_name: string;

  last_name: string;

  gender: string;

  phone_number: string;

  @Transform(({value}) => new Date(value).toISOString().slice(0,10))
  date_birth: any;

  profile_picture: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  ref_tok: string;
  constructor(partial: Partial<SerializedAuthUser>) {
    Object.assign(this, partial)
  }
}