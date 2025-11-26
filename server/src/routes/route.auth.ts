import { Router } from "express";
import AuthController from '../controllers/controller.auth';

const router = Router();

router.post("/register", AuthController.register);




export default router