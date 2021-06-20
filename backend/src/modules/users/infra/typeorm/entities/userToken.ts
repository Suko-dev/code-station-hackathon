import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user_tokens")
export class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  refresh_token: string;

  @Column()
  expire_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
