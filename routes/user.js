import express from 'express';
import { createUser, loginUser ,upload} from '../controller/userController.js';
import {verifyUserLogin} from "../services/userAuth.js"
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/upload',verifyUserLogin, upload);

export default router;
