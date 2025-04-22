import { Suspense } from 'react';
import { getPlanets } from './actions/get-planets.action';
import Planets from './pages/Planets';
import { ErrorBoundary } from './shared/ErrorBoundary';

function App() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Planetas del Sistema Solar
      </h1>

      <ErrorBoundary fallback={<h3>Error al cargar planetas</h3>}>
        <Suspense fallback={<h3>Cargando planetas...</h3>}>
          <Planets getPlanets={getPlanets()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
