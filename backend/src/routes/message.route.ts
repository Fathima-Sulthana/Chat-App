import express, { Router } from 'express';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller';
import { requireAuth } from '@clerk/express';

const router = Router();

router.get('/users', requireAuth(), getUsersForSidebar);
router.get('/:id', requireAuth(), getMessages);

router.post("/send/:id", requireAuth(), sendMessage);


export default router;