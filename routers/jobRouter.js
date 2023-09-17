import {Router} from 'express'
import { createJob, deleteJob, getAllJobs, getJob, updatejob } from '../controllers/jobController.js';

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updatejob).delete(deleteJob)

export default router;
