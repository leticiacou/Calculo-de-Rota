import { Router } from 'express'
const router = Router();

import { CreateRouteController } from './controllers/CreateRoutesController'

router.post('/routes', new CreateRouteController().handle)

export { router };
