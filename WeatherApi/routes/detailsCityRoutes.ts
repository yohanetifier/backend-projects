import express from 'express';
import { detailsCity } from '../controllers/city';

const router = express.Router();

router.post('/city', detailsCity);

export default router;
