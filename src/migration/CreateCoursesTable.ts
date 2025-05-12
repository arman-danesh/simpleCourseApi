import {MigrationInterface , QueryRunner , Table} from "typeorm";

export class CreateCoursesTable1675974051732 implements MigrationInterface{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'courses', // The name of the table being created
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true, // Auto-increment
                    },
                    {
                        name: 'title',
                        type: 'varchar', // Name of the user
                        length:'100'
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name:'teacher_id',
                        type:'integer'
                    }
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses'); // Reverts the migration
    }
}