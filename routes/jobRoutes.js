import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

const router = Router();

// POST /api/jobs - Create a new job
router.post('/api/jobs', createJob);

// GET /api/jobs - Get all jobs
router.get('/api/jobs', getAllJobs);

// GET /api/jobs/:id - Get a specific job by ID
router.get('/api/jobs/:id', getJobById);

// PUT /api/jobs/:id - Update a job by ID
router.put('/api/jobs/:id', updateJob);

// DELETE /api/jobs/:id - Delete a job by ID
router.delete('/api/jobs/:id', deleteJob);

export default router;
