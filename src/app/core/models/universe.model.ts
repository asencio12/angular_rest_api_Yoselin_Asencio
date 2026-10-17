export type UniverseId = 'digimon'  |   'dragon-ball' | 'pokemon' | 'demon-slayer'    ;

/* Datos de presentación de cada universo (dashboard, header y rutas). */
export interface Universe {
  id: UniverseId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  path: string;
  icon: string;
  accent: string;
}