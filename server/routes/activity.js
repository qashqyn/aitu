import express from 'express';
import auth from '../middleware/auth.js';

import { createActivity, deleteActivity, getActivities, getActivity } from '../controllers/activity.js';

const router = express.Router();

router.post('/', auth, createActivity);
router.get('/', getActivities);
router.get('/:id', getActivity);
router.delete('/:id', auth, deleteActivity);

export default router;