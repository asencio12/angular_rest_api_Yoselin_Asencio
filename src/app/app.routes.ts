import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  // Las rutas de cada universo se agregan en las fases 4 a 7.
  { path: '**', redirectTo: '' },
];