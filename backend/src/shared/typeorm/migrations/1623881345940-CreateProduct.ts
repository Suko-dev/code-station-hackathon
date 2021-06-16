import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class CreateProduct1623881345940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
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
            name: "total_price",
            type: "varchar",
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
            name: "fkProductUser",
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
    await queryRunner.dropTable("products");
  }
}
