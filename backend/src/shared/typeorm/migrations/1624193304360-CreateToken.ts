import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateToken1624193304360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_tokens",
        columns: [
          { name: "id", type: "varchar", isPrimary: true },
          { name: "refresh_token", type: "varchar" },
          { name: "userId", type: "varchar" },
          {
            name: "expire_date",
            type: "timestamp",
          },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKUserToken",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
