import express from "express";
import CourseRouter from "@routes/courseRouter";
import TeacherRouter from "@routes/teacherRouter";
import studentRouter from "@routes/studentRouter";
import RegistrationRouter from "@routes/registrationRouter";

const Routes = express();

Routes.use('/course', CourseRouter);
Routes.use('/teacher', TeacherRouter);
Routes.use('/student', studentRouter);
Routes.use('/registration', RegistrationRouter);

export default Routes;