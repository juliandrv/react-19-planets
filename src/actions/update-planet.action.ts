import { planetsApi } from '../api/planetsApi';
import type { Planet } from '../interfaces/planet.interface';

/* export const updatePlanetAction = async (planet: Planet) => {
  try {
    const response = await planetsApi.patch<Planet>(
      `/${planet.id}`,
      planet
    );
    console.log('Planeta actualizado');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el planeta');
  }
}; */

// update-planet.action.ts
export const updatePlanetAction = async (planet: Planet) => {
  try {
    // Ensure the name is uppercase before sending to the server
    const planetToUpdate = {
      ...planet,
      name: planet.name.toUpperCase(),
    };

    const response = await planetsApi.patch<Planet>(
      `/${planet.id}`,
      planetToUpdate
    );

    // Force uppercase in the response data
    return {
      ...response.data,
      name: response.data.name.toUpperCase(),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el planeta');
  }
};
