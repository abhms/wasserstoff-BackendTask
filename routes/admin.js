import express from 'express';
import { UpdateStatusReject,UpdateStatusReview,UpdateStatusApprove,DownloadIntoCSV} from '../controller/adminController.js';
import {verifyLogin} from "../services/adminAuth.js"
const router = express.Router();

router.post('/UpdateStatusReject',verifyLogin, UpdateStatusReject);
router.post('/UpdateStatusReview',verifyLogin, UpdateStatusReview);
router.post('/UpdateStatusApprove',verifyLogin, UpdateStatusApprove);
router.post('/DownloadIntoCSV',verifyLogin, DownloadIntoCSV);


export default router;
