// course.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Registration } from "@entity/Registrations"; // Adjust path as needed
import { Teacher } from "@entity/Teachers";

@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column()
    teacher_id:number;

    @ManyToOne(() => Teacher, (teacher) => teacher.courses, { eager: false })
    @JoinColumn({ name: "student_id" })
    teacher!: Teacher;

    @OneToMany(() => Registration, (registration) => registration.course)
    registrations!: Registration[];

    constructor(title: string, description: string, teacher: Teacher, teacher_id:number) {
        this.title = title;
        this.description = description;
        this.teacher = teacher;
        this.teacher_id = teacher_id;

    }
}
