import express from 'express';
import { loginControllers, registerControllers, setAvatarController } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);


export default router;