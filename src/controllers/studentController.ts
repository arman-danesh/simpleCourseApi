import { Request, Response } from "express";
import { StudentModel, StudentInterface } from "@models/studentModel";
import { ApiError } from "@utils/ApiError";

const studentModel = new StudentModel();

export class StudentController {
    static async CreateStudent(req: Request, res: Response): Promise<void> {
        try {
            const student: Omit<StudentInterface, 'rowid' | 'id'> = req.body;
            const dataStudnet = await studentModel.createStudent(student);
            if (dataStudnet.success){
                res.status(201).json({ success: "Student created successfully" });
            }else{
                res.status(400).json({ error:dataStudnet.error });
            }
        } catch (err) {
            console.error("CreateStudent Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async GetAllStudent(req: Request, res: Response): Promise<void> {
        try {
            const students = await studentModel.getAllStudents();
            res.status(200).json(students);
        } catch (err) {
            console.error("GetAllStudent Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async GetStudentById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const result = await studentModel.getStudentById(id);
            if (result.success) {
                res.status(200).json(result.student);
            } else {
                res.status(404).json({ error: result.error });
            }
        } catch (err) {
            console.error("GetStudentById Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async DeleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const result = await studentModel.deleteStudentById(id);
            if (result.success) {
                res.status(200).json({ success: `Student with id ${id} deleted successfully.` });
            } else {
                res.status(404).json({ error: result.error });
            }
        } catch (err) {
            console.error("DeleteStudent Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
}
