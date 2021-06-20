import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1624023921228 implements MigrationInterface {
  name = "createUser1624023921228";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying, "password" character varying NOT NULL, "email" character varying NOT NULL, "image" character varying, "profit" numeric NOT NULL DEFAULT '0.4', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
