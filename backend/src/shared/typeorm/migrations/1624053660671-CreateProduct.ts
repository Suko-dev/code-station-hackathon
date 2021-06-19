import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1624053660671 implements MigrationInterface {
  name = "CreateProduct1624053660671";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" character varying NOT NULL, "name" character varying NOT NULL, "total_price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_ingredients_ingredients" ("productId" character varying NOT NULL, "ingredientsId" character varying NOT NULL, CONSTRAINT "PK_27cdd32a1d0f4e61995dc24fdb3" PRIMARY KEY ("productId", "ingredientsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e34637dfebdaf7d46b7b265384" ON "product_ingredients_ingredients" ("productId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b734146b33ec2c5dcefcab53e2" ON "product_ingredients_ingredients" ("ingredientsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT '0.4'`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_ingredients_ingredients" ADD CONSTRAINT "FK_e34637dfebdaf7d46b7b2653841" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_ingredients_ingredients" ADD CONSTRAINT "FK_b734146b33ec2c5dcefcab53e29" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_ingredients_ingredients" DROP CONSTRAINT "FK_b734146b33ec2c5dcefcab53e29"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_ingredients_ingredients" DROP CONSTRAINT "FK_e34637dfebdaf7d46b7b2653841"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT 0.4`
    );
    await queryRunner.query(`DROP INDEX "IDX_b734146b33ec2c5dcefcab53e2"`);

    await queryRunner.query(`DROP INDEX "IDX_e34637dfebdaf7d46b7b265384"`);

    await queryRunner.query(`DROP TABLE "product_ingredients_ingredients"`);

    await queryRunner.query(`DROP TABLE "product"`);
  }
}
