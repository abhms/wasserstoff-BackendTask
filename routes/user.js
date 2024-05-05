import express from 'express';
import { createUser, loginUser ,upload} from '../controller/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/upload', upload);

export default router;
