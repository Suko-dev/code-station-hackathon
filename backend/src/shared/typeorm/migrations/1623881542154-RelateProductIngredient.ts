import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class RelateProductIngredient1623881542154
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products_ingredients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "ingredientsId",
            type: "uuid",
          },
          {
            name: "productsId",
            type: "uuid",
          },
          {
            name: "quantity",
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
            name: "fkProductIngredient",
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            columnNames: ["productsId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fkIngredientProduct",
            referencedTableName: "ingredients",
            referencedColumnNames: ["id"],
            columnNames: ["ingredientsId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products_ingredients");
  }
}
