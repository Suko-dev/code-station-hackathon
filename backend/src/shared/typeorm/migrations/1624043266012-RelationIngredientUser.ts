import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationIngredientUser1624043266012 implements MigrationInterface {
  name = "RelationIngredientUser1624043266012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredients" DROP COLUMN "unity_type"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredients" ADD "unit_type" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredients" ADD "userId" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290"`
    );
    await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "userId"`);

    await queryRunner.query(
      `ALTER TABLE "ingredients" DROP COLUMN "unit_type"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredients" ADD "unity_type" character varying NOT NULL`
    );
  }
}
