// Teachers.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "@entity/Courses";

@Entity("teachers")
export class Teacher {
    @PrimaryGeneratedColumn({ type: "integer" }) // ✅ Fix for SQLite
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @OneToMany(() => Course, (course) => course.teacher)
    courses!: Course[];

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
