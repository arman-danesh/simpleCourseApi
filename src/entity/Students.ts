// Students.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Registration } from "@entity/Registrations";

@Entity("students")
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @OneToMany(() => Registration, (registration) => registration.student)
    registrations!: Registration[];

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
