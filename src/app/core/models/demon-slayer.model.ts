/** Personaje tal como llega en la lista: GET /characters?page=1&limit=5 */
export interface DemonSlayerListItem {
  id: number;
  name: string;
  img: string;
}

export interface DemonSlayerPagination {
  totalElements: number;
  elementsOnPage: number;
  currentPage: number;
  totalPages: number;
}

export interface DemonSlayerListResponse {
  pagination: DemonSlayerPagination;
  content: DemonSlayerListItem[];
}

export interface DemonSlayerArc {
  name: string;
  description: string;
}

export interface DemonSlayerAffiliation {
  name: string;
  description: string;
}

export interface DemonSlayerCombatStyle {
  id: number;
  name: string;
  description: string;
  img: string;
}

/** Detalle de un personaje: GET /characters?id=30 */
export interface DemonSlayerInfo {
  id: number;
  name: string;
  age: number | null;
  gender: string;
  race: string;
  description: string;
  img: string;
  quote: string;
  first_arc_appearance?: DemonSlayerArc;
  affiliation?: DemonSlayerAffiliation;
  combat_style?: DemonSlayerCombatStyle[];
}

/** Esta API responde el detalle dentro de una lista llamada "content" */
export interface DemonSlayerDetailResponse {
  content: DemonSlayerInfo[];
}