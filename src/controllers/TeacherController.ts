import {Request , Response} from "express";
import {TeacherModel, TeacherInterface} from "@models/teacherModel";
import {ApiError} from "@utils/ApiError";

const newTeacherModel = new TeacherModel;

export class TeacherController{
    static async CreateTeacher(req:Request , res:Response){
        try {
            const teacher:Omit<TeacherInterface, 'rowid' | 'id'> = req.body;
            const result = await newTeacherModel.createTeacher(teacher);
            if (result.success){
                res.status(200).json({success: 'teacher has been created'});
            }else {
                res.status(400).json({error: result.error});
            }
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
    static async GetAllTeachers(req:Request , res:Response){
        try {
            const teachers = await newTeacherModel.getAllOfTeachers();
            if (teachers !== null ){
                res.status(200).json(teachers)
            }else{
                res.status(400).json({error:'there is not teacher'})
            }
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
    static async GetTeacherById(req:Request , res:Response){
        const id = req.params.id;
        try {
            const teacher = await newTeacherModel.getTeacherById(Number(id));
            if(teacher.success){
                res.status(200).json(teacher.teacher);
            }else{
                res.status(400).json({error:teacher.error});
            }
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
    static async DeleteTeacher(req:Request , res:Response){
        const id = req.params.id;
        try {
            const result = await newTeacherModel.deleteTeacher(Number(id));
            if(result.success){
                res.status(200).json({success:`teacher with id:${id} has been deleted`});
            }else{
                res.status(400).json({error:result.error});
            }
        } catch (err) {
            console.error("Could not add student to the course:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
}