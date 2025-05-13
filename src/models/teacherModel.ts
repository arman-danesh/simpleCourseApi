import {connectToDatabase} from "@data/database";

export interface TeacherInterface{
    rowid:number;
    id:number;
    name:string;
    email:string;
}

export class TeacherModel{
    private nameOfTeacherTable = 'teachers';
    private async getDb(){
        return await connectToDatabase();
    }
    async createTeacher(teacher:Omit<TeacherInterface, 'rowid' | 'id'>):Promise<{success:true} | {success:false,error:string}>{
        const db = await this.getDb();
        const row = await db.get<{ maxId: number }>(`SELECT MAX(id) as maxId FROM ${this.nameOfTeacherTable}`);
        const newId = (row?.maxId ?? 0) + 1;
        const {name , email} = teacher
        const existingEmail = await db.get(`SELECT * FROM ${this.nameOfTeacherTable} WHERE email=?`,email)
        if (existingEmail){
            return {success:false, error:`email ${email} is in the data base`}
        }else{
            await db.run(`INSERT INTO ${this.nameOfTeacherTable} (id, name, email) VALUES (?, ?, ?)`, newId, name, email);
            return {success:true}
        }
    }
    async getAllOfTeachers() :Promise<TeacherInterface[] | null> {
        const db = await this.getDb();
        return db.all(`SELECT * FROM ${this.nameOfTeacherTable}`);
    }
    async getTeacherById(id:number):Promise<{success:true , teacher:Omit<TeacherInterface,'rowid'>} | {success:false , error:string}>{
        const db = await this.getDb();
        const teacher = await db.get<TeacherInterface>(`SELECT * FROM ${this.nameOfTeacherTable} WHERE id = ?`,id);
        if(!teacher){
            return {success:false , error:'teacher in not found'}
        } else{
            return {success:true , teacher : teacher}
        }
    }
    async deleteTeacher(id:number):Promise<{success:true}|{success:false,error:string}>{
        const db = await this.getDb();
        const idStatus = db.get(`SELECT * FROM ${this.nameOfTeacherTable} WHERE id=?`,id);
        if (!idStatus){
            return {success:false,error:`teacher with id:${id} is not in the database`}
        }else{
            await db.run(`DELETE FROM ${this.nameOfTeacherTable} WHERE id=?`, id);
            return {success:true}
        }
    }
}