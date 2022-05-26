import express from 'express';

import { register, getApplicants, getApplicant, changeStatus, openRegistration, getRegistrationTime, addBuilding, addRoom, getBuildings, changeRegistrationTime } from '../controllers/dorm.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.get('/applicants/:id', getApplicant);
router.patch('/applicants/:id', changeStatus);
router.get('/applicants', getApplicants);
router.post('/open', auth, openRegistration);
router.post('/change_reg_time', changeRegistrationTime)
router.get('/reg_time', getRegistrationTime);

router.get('/buildings', auth, getBuildings);
router.post('/buildings/addbuilding', auth, addBuilding);
router.post('/buildings/addroom', auth, addRoom);

export default router;