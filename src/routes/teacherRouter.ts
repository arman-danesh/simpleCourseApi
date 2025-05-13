import {Router} from 'express';
import {TeacherController} from "@controllers/TeacherController";

const route = Router();

route.route('/')
    .get(TeacherController.GetAllTeachers)
    .post(TeacherController.CreateTeacher);

route.route('/:id')
    .get(TeacherController.GetTeacherById)
    .delete(TeacherController.DeleteTeacher);

export default route;