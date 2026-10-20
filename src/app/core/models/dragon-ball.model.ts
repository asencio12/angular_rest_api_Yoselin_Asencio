/** Personaje tal como llega en el listado: GET /characters?page=1&limit=10 */
export interface DragonBallCharacterItem {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
}

export interface DragonBallMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface DragonBallListResponse {
  items: DragonBallCharacterItem[];
  meta: DragonBallMeta;
}

export interface DragonBallPlanet {
  id: number;
  name: string;
  isDestroyed?: boolean;
  description?: string;
  image?: string;
}

export interface DragonBallTransformation {
  id: number;
  name: string;
  image?: string;
  ki?: string;
}

/** Detalle: GET /characters/{id}. Agrega el planeta de origen y las transformaciones. */
export interface DragonBallDetail extends DragonBallCharacterItem {
  originPlanet?: DragonBallPlanet | null;
  transformations?: DragonBallTransformation[];
}