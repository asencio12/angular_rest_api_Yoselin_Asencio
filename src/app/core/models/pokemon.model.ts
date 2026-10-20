
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonAbility {
  is_hidden: boolean;
  ability: { name: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

/**GET /pokemon/{id} */
export interface PokemonInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}