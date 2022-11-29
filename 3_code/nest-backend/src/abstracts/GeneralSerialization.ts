import { Exclude } from "class-transformer";
export abstract class GeneralSerialization {
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  password: string;
}