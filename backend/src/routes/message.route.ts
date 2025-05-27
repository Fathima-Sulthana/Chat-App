import express, { Router } from 'express';
import { getUsersForSidebar } from '../controllers/message.controller';
import { requireAuth } from '@clerk/express';

const router = Router();

router.get('/users', requireAuth(), getUsersForSidebar);


export default router;