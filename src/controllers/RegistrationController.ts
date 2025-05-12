import { Request, Response } from "express";
import { RegistrationModelInterface, RegistrationModel } from "@models/registrationModel";
import { ApiError } from "@utils/ApiError";

const newRegistrationModel = new RegistrationModel();

export class RegistrationController {
    static async AddStudentToCourse(req: Request, res: Response): Promise<void> {
        const registration: Omit<RegistrationModelInterface, 'rowid' | 'error'> = req.body;

        try {
            const result = await newRegistrationModel.addStudentToRegistration(registration);

            if (!result.success) {
                res.status(400).json({ error: result.error });
                return;
            }

            res.status(201).json({ message: "Student successfully registered" });
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async GetAllRegistration(req:Request , res:Response){
        try {
            const ALLOFRegistration:RegistrationModelInterface[] = await newRegistrationModel.getAllRegistration();
            res.status(200).json(ALLOFRegistration);
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
    static async GetCourseStudents(req:Request , res:Response){
        const courseId = req.params.id;

        try {
            const courseStudent = await newRegistrationModel.getCourseStudents(Number(courseId));
            if (courseStudent.success){
                res.status(200).json(courseStudent);
            }else{
                res.status(400).json({error: courseStudent.error});
            }
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
}
