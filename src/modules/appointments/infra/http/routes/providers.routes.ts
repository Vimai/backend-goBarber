import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const ProvidersRouter = Router();
const providerController = new ProvidersController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providerController.index);

export default ProvidersRouter;
