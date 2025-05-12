import { Router } from "express";
import { StudentController } from "@controllers/studentController";

const router = Router();

// RESTful and consistent route naming
router
    .route('/')
    .get(StudentController.GetAllStudent)   // GET /student
    .post(StudentController.CreateStudent); // POST /student

router
    .route('/:id')
    .get(StudentController.GetStudentById)  // GET /student/:id
    .delete(StudentController.DeleteStudent); // DELETE /student/:id

export default router;
