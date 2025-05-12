import { connectToDatabase } from "@datadatabase";
import {StudentInterface} from "@modelsstudentModel";
export interface RegistrationModelInterface {
    error?: string;
    rowid: number;
    student_id: number;
    course_id: number;
    registered_at: string;
}

export class RegistrationModel {
    private nameOfRegistrationsTable = "registrations";
    private nameOfStudentTable = "students";
    private nameOfCourseTable = "courses";

    private async getDb() {
        return await connectToDatabase();
    }

    async addStudentToRegistration(
        registration: Omit<RegistrationModelInterface, 'rowid' | 'error' | 'registered_at'>
    ): Promise<{ success: true } | { success: false; error: string }> {
        const db = await this.getDb();
        const { student_id, course_id  } = registration;
        const registered_at = Date.now();

        const student = await db.get(
            `SELECT * FROM ${this.nameOfStudentTable} WHERE id = ?`,
            student_id
        );
        const course = await db.get(
            `SELECT * FROM ${this.nameOfCourseTable} WHERE id = ?`,
            course_id
        );

        if (!student) {
            return { success: false, error: "Student not found" };
        }
        if (!course) {
            return { success: false, error: "Course not found" };
        }

        await db.run(
            `INSERT INTO ${this.nameOfRegistrationsTable} (student_id, course_id, registered_at) VALUES (?, ?, ?)`,
            student_id,
            course_id,
            registered_at
        );

        return { success: true };
    }

    async getAllRegistration() {
        const db = await this.getDb();
        return await db.all(`SELECT * FROM ${this.nameOfRegistrationsTable}`);
    }

    async getCourseStudents(course_id: number): Promise<
        | { success: true; students: StudentInterface[] }
        | { success: false; error: string }
    > {
        const db = await this.getDb();

        const course = await db.get(
            `SELECT * FROM ${this.nameOfCourseTable} WHERE id = ?`,
            course_id
        );

        if (!course) {
            return { success: false, error: "Course not found need to make the course" };
        }

        const students = await db.all(`SELECT s.*  FROM ${this.nameOfRegistrationsTable} r INNER JOIN ${this.nameOfStudentTable} s ON r.student_id = s.id WHERE r.course_id = ?`, course_id);

        return { success: true, students };
    }
}
