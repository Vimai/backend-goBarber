import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const ProvidersRouter = Router();
const providerController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providerController.index);

ProvidersRouter.get(
  '/:provider_id/month-availability',
  providerDayAvailabilityController.index,
);

ProvidersRouter.get(
  '/:provider_id/day-availability',
  providerMonthAvailabilityController.index,
);

export default ProvidersRouter;
