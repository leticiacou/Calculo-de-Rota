import prismaClient from "../prisma";
import axios from "axios";

interface RouteRequest {
  origin: string; // latitude, longitude
  destination: string; // latitude, longitude
}

export class CreateRouteService {
  async execute({ origin, destination }: RouteRequest) {

    // Chamar API de mapas
    const apiKey = process.env.MAPS_API_KEY;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${origin}&end=${destination}`;

    const response = await axios.get(url);

    const data = response.data.features[0];

    const distance = data.properties.summary.distance; // metros
    const duration = data.properties.summary.duration; // segundos
    const geojson = data; // rota inteira


    // 2. Salvar no banco
    const route = await prismaClient.route.create({
      data: {
        origin,
        destination,
        distance_meters : distance,
        duration_seconds : duration,
        geometry : geojson
      },
      select: {
        id: true, 
        origin: true,
        destination: true,
        distance_meters: true,
        duration_seconds: true,
        // Chamar o geojson por enquanto não é necessário, ele vai puxar o passo a passo de como ir da origem até o destino
      }
    });

    return route;
  }
}