import { Router } from 'express'
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from '../controllers/jobController.js';
import { validateJobInput, validateIdparam } from '../middleware/validationMiddleware.js';

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route('/').get(getAllJobs).post(validateJobInput, createJob)
router.route('/:id').get(validateIdparam, getJob).patch(validateJobInput, validateIdparam, updateJob).delete(validateIdparam, deleteJob)

export default router;
