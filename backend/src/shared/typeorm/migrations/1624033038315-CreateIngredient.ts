import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredient1624033038315 implements MigrationInterface {
  name = "CreateIngredient1624033038315";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("id" character varying NOT NULL, "name" character varying NOT NULL, "unity_type" character varying NOT NULL, "unit_price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT '0.4'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT 0.4`
    );
    await queryRunner.query(`DROP TABLE "ingredients"`);
  }
}
