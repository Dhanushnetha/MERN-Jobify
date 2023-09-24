import { Router } from 'express'
import { createJob, deleteJob, getAllJobs, getJob, showStats, updateJob } from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
import { validateJobInput, validateIdparam } from '../middleware/validationMiddleware.js';

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)
router.route('/stats').get(showStats);
router.route('/:id').get(validateIdparam, getJob).patch(checkForTestUser, validateJobInput, validateIdparam, updateJob).delete(checkForTestUser, validateIdparam, deleteJob)

export default router;
