import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DigimonDetail } from './pages/digimon/digimon-detail/digimon-detail';
import { DigimonList } from './pages/digimon/digimon-list/digimon-list';

export const routes: Routes = [
  { path: '', component: Dashboard, title: 'Inicio' },
  { path: 'digimon', component: DigimonList, title: 'Digimon' },
  { path: 'digimon/:id', component: DigimonDetail, title: 'Detalle de Digimon' },
  { path: '**', redirectTo: '' },
];