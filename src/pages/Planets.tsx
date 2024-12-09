import { FC, useEffect, useState } from 'react';
import { planetsApi } from '../api/planetsApi';
import { Planet } from '../interfaces/planet.interface';
import { EditPlanetForm } from './ui/EditPlanetForm';
import { PlanetList } from './ui/PlanetList';

const Planets: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    planetsApi.get('/').then((res) => {
      setPlanets(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>

      {/* Formulario para agregar un planeta */}
      <EditPlanetForm />

      {/* Lista de planetas Grid*/}
      {isLoading ? <p>Cargando...</p> : <PlanetList planets={planets} />}
    </div>
  );
};

export default Planets;
