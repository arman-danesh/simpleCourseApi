import {Router} from 'express';
import {CourseController} from "@controllers/CourseController";

const router = Router();

router.route('/')
    .post(CourseController.CreateCourse)
    .get(CourseController.GetAllOfCourse)


router.route('/:id')
    .get(CourseController.GetCourseById)
    .delete(CourseController.DeleteCourse)


export default router;