import express from 'express';
import { saveStep, getForm } from '../controllers/formController.js';

const router = express.Router();

router.post('/save-step', saveStep);
router.get('/:userId', getForm);

export default router;