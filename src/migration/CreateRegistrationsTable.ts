import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRegistrationsTable1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the table
        await queryRunner.createTable(
            new Table({
                name: "registrations",
                columns: [
                    {
                        name: "student_id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "course_id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "registered_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        // Add foreign key to students
        await queryRunner.createForeignKey(
            "registrations",
            new TableForeignKey({
                columnNames: ["student_id"],
                referencedTableName: "students",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        );

        // Add foreign key to courses
        await queryRunner.createForeignKey(
            "registrations",
            new TableForeignKey({
                columnNames: ["course_id"],
                referencedTableName: "courses",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("registrations");
    }
}
