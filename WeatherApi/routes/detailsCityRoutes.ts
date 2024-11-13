import express from 'express';
import { detailsCityCtrl } from '../controllers/city';

const router = express.Router();

router.post('/city', detailsCityCtrl);

export default router;
