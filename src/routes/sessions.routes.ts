import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    return response.json({ ok: '2' });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default sessionsRouter;
