import {Router} from "express";
import {RegistrationController} from "@controllersRegistrationController";

const router = Router();

router.route('/')
    .post(RegistrationController.AddStudentToCourse)
    .get(RegistrationController.GetAllRegistration);
router.route('/:id')
    .get(RegistrationController.GetCourseStudents)


export default router;