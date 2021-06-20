import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Ingredient } from "../../../../ingredients/infra/typeorm/entities/ingredient";
import { Product } from "../../../../products/infra/typeorm/entities/products";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0.4, type: "decimal" })
  profit: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

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

export { User };
