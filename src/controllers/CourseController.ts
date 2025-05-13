import {Request , Response} from "express";
import { CourseModel , CourseModelInterface} from "@models/courseModel";
import {ApiError} from "@utils/ApiError";

const newCourseModel = new CourseModel();
export class CourseController{

    static async CreateCourse(req: Request, res: Response) {
        const course: Omit<CourseModelInterface, "rowid" | "id"> = req.body;
        try {
            const result = await newCourseModel.createCourse(course);
            if (result.success) {
                res.status(200).json({ success: `created the course with id ${result.id}` });
            } else {
                res.status(400).json({ error: result.error });
            }
        } catch (err) {
            console.error("Create Course Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
    static async GetAllOfCourse(req:Request , res:Response){
        try{
            const allOfTheCourse = await newCourseModel.getAllCourse();
            res.status(200).json(allOfTheCourse);
        } catch (err) {
            console.error("Get All Course Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async GetCourseById(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            const course = await newCourseModel.getCourseById(id);
            if (course.success){
                res.status(200).json(course);
            }else{
                res.status(404).json({error:course.error});
            }
        } catch (err) {
            console.error("Get Course Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }

    static async DeleteCourse(req:Request , res:Response){
        const id = req.params.id;
        try {
          const deleteCourse = await newCourseModel.deleteCourse(Number(id));
          if (deleteCourse.success){
              res.status(200).json({success:`course with id:${id} has deleted`});
          }else{
              res.status(400).json({error:deleteCourse.error});
          }
        } catch (err){
            console.error("Delete Course Error:", err);
            const message = err instanceof ApiError ? err.message : "Internal Server Error";
            const status = err instanceof ApiError ? err.statusCode : 500;
            res.status(status).json({ error: message });
        }
    }
}