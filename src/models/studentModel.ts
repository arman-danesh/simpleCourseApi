import { connectToDatabase } from "@data/database";
import { ApiError } from "@utils/ApiError"; // Make sure this exists

export interface StudentInterface {
    rowid?: number;
    id: number;
    name: string;
    email: string;
}

export class StudentModel {
    private nameOfRegistrationsTable = "registrations";
    private nameOfStudentTable = "students";
    private async getDb() {
        return await connectToDatabase();
    }

    async createStudent(student: Omit<StudentInterface, "rowid" | "id">):Promise<{ success:true } | {success:false,error:string}> {
        const db = await this.getDb();
        const row = await db.get<{ maxId: number }>(`SELECT MAX(id) as maxId FROM ${this.nameOfStudentTable}`);
        const newId = (row?.maxId ?? 0) + 1;
        const { name, email } = student;
        const existingEmail = await db.get(`SELECT * FROM ${this.nameOfStudentTable} WHERE email=?`,email)
        if (existingEmail){
            return {success:false, error:`email ${email} is in the data base`}
        }else{
            await db.run(`INSERT INTO ${this.nameOfStudentTable} (id, name, email) VALUES (?, ?, ?)`, newId, name, email);
            return {success:true}
        }
    }

    async getAllStudents(): Promise<Omit<StudentInterface, 'rowid'>[]> {
        const db = await this.getDb();
        return await db.all<StudentInterface[]>(`SELECT * FROM ${this.nameOfStudentTable}`);
    }

    async getStudentById(id: number): Promise< {success:true , student:Omit<StudentInterface, 'rowid'>} | { success: false; error: string }> {
        const db = await this.getDb();
        const student = await db.get<StudentInterface>(`SELECT * FROM ${this.nameOfStudentTable} WHERE id = ?`, id);
        if (!student) {
            return {success:false , error:`student with id:${id} is not found `}
        }else {
            return {success:true,student:student};
        }
    }

    async deleteStudentById(id: number): Promise<{ success: true } | { success: false; error: string }> {
        const db = await this.getDb();
        const student = await db.get(`SELECT * FROM ${this.nameOfStudentTable} WHERE id = ?`, id);
        const studentInRegistrations = await db.get(`SELECT * FROM ${this.nameOfRegistrationsTable} WHERE student_id = ?`,id)
        if (!student) {
            return {success:false , error:`there is no student with id:${id}`}
        }else{
            await db.run(`DELETE FROM ${this.nameOfStudentTable} WHERE id = ?`, id);
            if (studentInRegistrations){
                await db.run(`DELETE FROM ${this.nameOfRegistrationsTable} WHERE id = ?`, id);
            }
            return {success:true};
        }
    }
}
