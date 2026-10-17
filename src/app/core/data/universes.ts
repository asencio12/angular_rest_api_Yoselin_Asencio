import { Universe } from '../models/universe.model';

export const UNIVERSES: Universe[] = [
  {
    id: 'digimon',
    name: 'Digimon',
    tagline: 'Monstruos digitales',
    description:
      'Criaturas nacidas del mundo digital que evolucionan junto a sus compañeros. Explora sus niveles, atributos y habilidades.',
    image: 'https://digi-api.com/images/digimon/w/Agumon.png',
    path: '/digimon',
    icon: 'smart_toy',
    accent: '#c7824a',
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball Z',
    tagline: 'Guerreros del universo',
    description:
      'Saiyajins, androides y dioses. Consulta las razas, las transformaciones y el nivel de poder de los héroes de la serie.',
    image: 'https://dragonball-api.com/characters/goku_normal.webp',
    path: '/dragon-ball',
    icon: 'bolt',
    accent: '#1565c0',
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    tagline: 'Criaturas y entrenadores',
    description:
      'Más de mil criaturas para descubrir en la Pokédex, con sus tipos, habilidades y estadísticas base.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    path: '/pokemon',
    icon: 'catching_pokemon',
    accent: '#d32f2f',
  },
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    tagline: 'Cazadores de demonios',
    description:
      'Cazadores y demonios del Japón de la era Taisho. Conoce a los personajes de Kimetsu no Yaiba y su historia.',
    image: 'https://www.demonslayer-api.com/api/v1/characters/images/1.webp',
    path: '/demon-slayer',
    icon: 'local_fire_department',
    accent: '#00695c',
  },
];