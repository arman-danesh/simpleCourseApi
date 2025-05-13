    import { connectToDatabase } from "@data/database";

    export interface CourseModelInterface {
        rowid: number;
        id: number;
        title: string;
        description: string;
        teacher_id:number;
    }

    export class CourseModel {
        private nameOfRegistrationsTable = "registrations";
        private nameOfCourseTable = "courses";
        private nameOfTeacherTable = "teachers";

        private async getDb() {
            return await connectToDatabase();
        }

        async createCourse(course: Omit<CourseModelInterface, "rowid" | "id">): Promise<{ success: true; id: number } | { success: false; error: string }> {
            const db = await this.getDb();
            const row = await db.get<{ maxId: number }>(`SELECT MAX(id) as maxId FROM ${this.nameOfCourseTable}`);
            const newId = (row?.maxId ?? 0) + 1;
            const { title, description, teacher_id } = course;
            const teacherId = await db.get(`SELECT * FROM ${this.nameOfTeacherTable} WHERE id=? `,teacher_id)
            if (teacherId){
                await db.run(`INSERT INTO ${this.nameOfCourseTable} (id, title, description , teacher_id) VALUES (?, ?, ? , ?)`,
                    newId, title, description, teacher_id);
                return { success: true, id: newId };
            }else{
                return {success:false , error:`teacher with id ${teacher_id} is not found`};
            }
        }

        async getAllCourse():Promise <Omit<CourseModelInterface, "rowid">[]>{
            const db = await this.getDb();
            return await db.all(`SELECT * FROM ${this.nameOfCourseTable}`);
        }

        async getCourseById(id: number): Promise <{success:true , course:Omit<CourseModelInterface, "rowid">} | {success:false , error:string}>{
            const db = await this.getDb();
            const course = await db.get(`SELECT * FROM ${this.nameOfCourseTable} WHERE id=? `,id);
            if (!course){
                return {success:false,error:`could not get the course with id:${id}`}
            }else {
                return {success:true , course}
            }
        }

        async deleteCourse(id: number):Promise<{success:true} | {success:false,error:string}> {
            const db = await this.getDb();
            const course = await db.get(`SELECT * FROM ${this.nameOfCourseTable} WHERE id = ?`, id);
            if (!course){
                return {success:false , error:`could not delete the course with id:${id}`}
            } else{
                await db.run(`DELETE FROM ${this.nameOfCourseTable} WHERE id = ?`, id);
                await db.run(`DELETE FROM ${this.nameOfRegistrationsTable} WHERE course_id=?`,id);
                return {success:true}
            }
        }
    }