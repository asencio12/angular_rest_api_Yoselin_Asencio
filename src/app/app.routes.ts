import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DigimonDetail } from './pages/digimon/digimon-detail/digimon-detail';
import { DigimonList } from './pages/digimon/digimon-list/digimon-list';
import { DragonBallDetail } from './pages/dragon-ball/dragon-ball-detail/dragon-ball-detail';
import { DragonBallList } from './pages/dragon-ball/dragon-ball-list/dragon-ball-list';
import { PokemonDetail } from './pages/pokemon/pokemon-detail/pokemon-detail';
import { PokemonList } from './pages/pokemon/pokemon-list/pokemon-list';

export const routes: Routes = [
  { path: '', component: Dashboard, title: 'Inicio' },
  { path: 'digimon', component: DigimonList, title: 'Digimon' },
  { path: 'digimon/:id', component: DigimonDetail, title: 'Detalle de Digimon' },
  { path: 'dragon-ball', component: DragonBallList, title: 'Dragon Ball Z' },
  { path: 'dragon-ball/:id', component: DragonBallDetail, title: 'Detalle de Dragon Ball Z' },
  { path: 'pokemon', component: PokemonList, title: 'Pokémon' },
  { path: 'pokemon/:id', component: PokemonDetail, title: 'Detalle de Pokémon' },
];