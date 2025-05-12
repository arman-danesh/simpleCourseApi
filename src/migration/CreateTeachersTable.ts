import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTeachersTable1680000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teachers",
                columns: [
                    {
                        name: "id",
                        type: "integer", // ✅ Use "integer" instead of "int" for SQLite
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teachers");
    }
}
