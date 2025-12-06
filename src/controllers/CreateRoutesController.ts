import { Response, Request } from "express";
import { CreateRouteService } from "../services/CreateRoutesService";

class CreateRouteController{
    async handle(req : Request, res : Response){
        const {origin, destination} = req.body
        const createRouteService = new CreateRouteService

        const route = await createRouteService.execute({
            origin,
            destination
        })

        res.json(route)
    }
}

export { CreateRouteController }