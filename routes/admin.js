import express from 'express';
import { UpdateStatusReject,UpdateStatusReview,UpdateStatusApprove,DownloadIntoCSV,DownloadJson,DownloadXml} from '../controller/adminController.js';
import {verifyLogin} from "../services/adminAuth.js"
const router = express.Router();

router.post('/UpdateStatusReject',verifyLogin, UpdateStatusReject);
router.post('/UpdateStatusReview',verifyLogin, UpdateStatusReview);
router.post('/UpdateStatusApprove',verifyLogin, UpdateStatusApprove);
router.post('/DownloadIntoCSV',verifyLogin, DownloadIntoCSV);
router.post('/DownloadJson',verifyLogin, DownloadJson);
router.post('/DownloadXml',verifyLogin, DownloadXml);


export default router;
