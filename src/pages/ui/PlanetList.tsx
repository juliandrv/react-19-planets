import { useOptimistic, useState, useTransition } from 'react';
import { updatePlanetAction } from '../../actions/update-planet.action';
import { Planet } from '../../interfaces/planet.interface';

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [updatingPlanetId, setUpdatingPlanetId] = useState<
    string | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const [optimisticPlanets, setOptimisticNewPlanets] = useOptimistic(
    planets,
    (current: Planet[], newPlanet: Planet) => {
      const updatedPlanets = current.map((planet) =>
        planet.id === newPlanet.id ? newPlanet : planet
      );

      return updatedPlanets;
    }
  );

  const handleUpdate = async (planet: Planet) => {
    setUpdatingPlanetId(planet.id);

    startTransition(async () => {
      const uppercaseName = planet.name.toUpperCase();
      const data = {
        ...planet,
        name: uppercaseName,
      };

      try {
        setOptimisticNewPlanets(data);
        const updatedPlanet = await updatePlanetAction(data);
        setOptimisticNewPlanets({
          ...updatedPlanet,
          name: uppercaseName,
        });
      } catch (error) {
        console.log(error);

        setOptimisticNewPlanets({
          ...planet,
          name: planet.name.toLowerCase(),
        });
      } finally {
        setUpdatingPlanetId(null);
      }
    });
  };

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn'>
      {optimisticPlanets.map((planet) => (
        <div
          key={planet.id}
          className='p-4 bg-gray-100 rounded shadow'
        >
          <h2 className='text-xl font-semibold'>{planet.name}</h2>
          <p className='text-gray-700'>{planet.type}</p>
          <p className='text-gray-700'>{planet.distanceFromSun}</p>

          <br />

          <button
            onClick={() => handleUpdate(planet)}
            className='bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full'
            disabled={isPending && updatingPlanetId === planet.id}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
