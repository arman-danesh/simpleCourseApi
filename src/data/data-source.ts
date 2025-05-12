// src/data/data-source.ts
import { DataSource } from 'typeorm';
import { Student } from '@entity/Students';
import { Registration } from '@entity/Registrations';
import { Course } from '@entity/Courses';
import { Teacher } from '@entity/Teachers';

const AppDataSource = new DataSource({
    type: 'sqlite',  // Adjust based on your database
    database: './course.db',
    synchronize: false, // Set to false to avoid auto schema changes
    logging: true,
    entities: [Student , Registration ,Course,Teacher], // Include all entity classes
    migrations: ['src/migration/**/*.ts'], // This will include all migrations in this path
    subscribers: [],
});

export default AppDataSource;