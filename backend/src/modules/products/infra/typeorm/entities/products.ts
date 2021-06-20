import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Ingredient } from "../../../../ingredients/infra/typeorm/entities/ingredient";
import { User } from "../../../../users/infra/typeorm/entities/user";

@Entity()
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.products, { cascade: true })
  user: User;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.products)
  @JoinTable()
  ingredients: Ingredient[];

  @Column({ type: "decimal" })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
