import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationUserIngredient1624048282751 implements MigrationInterface {
    name = 'RelationUserIngredient1624048282751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT '0.4'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profit" SET DEFAULT 0.4`);
    }

}
