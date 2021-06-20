import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Product } from "../../../../products/infra/typeorm/entities/products";
import { User } from "../../../../users/infra/typeorm/entities/user";

@Entity("ingredients")
class Ingredient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  unit_type: string;

  @Column({ type: "decimal" })
  unit_price: number;

  @ManyToMany(() => Product, (product) => product.ingredients)
  products: Product[];

  @ManyToOne(() => User, (user) => user.ingredients, {
    cascade: true,
  })
  user: User;

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

export { Ingredient };
