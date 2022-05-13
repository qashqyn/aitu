import express from 'express';

import { register, getApplicants, getApplicant, changeStatus } from '../controllers/dorm.js';

const router = express.Router();

router.post('/register', register);
router.get('/applicants/:id', getApplicant);
router.patch('/applicants/:id', changeStatus);
router.get('/applicants', getApplicants);

export default router;