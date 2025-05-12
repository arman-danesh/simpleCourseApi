import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { Student } from "@entity/Students";
import { Course } from "@entity/Courses";

@Entity("registrations")
export class Registration {
    @PrimaryColumn()
    student_id!: number;

    @PrimaryColumn()
    course_id!: number;

    @CreateDateColumn({ name: "registered_at" })
    registered_at!: Date;

    @ManyToOne(() => Student, (student) => student.registrations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "student_id" })
    student!: Student;

    @ManyToOne(() => Course, (course) => course.registrations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "course_id" })
    course!: Course;

    constructor(student?: Student, course?: Course) {
        if (student) {
            this.student = student;
            this.student_id = student.id;
        }
        if (course) {
            this.course = course;
            this.course_id = course.id;
        }
    }
}
