import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class CreateIngredient1623880959087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ingredients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "usersId",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "unit_type",
            type: "varchar",
          },
          {
            name: "unit_price",
            type: "decimal",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fkIngrdientUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["usersId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ingredients");
  }
}
