/** Elemento del listado: GET /digimon */
export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonPageInfo {
  currentPage: number;
  elementsOnPage: number;
  totalElements: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface DigimonListResponse {
  content: DigimonListItem[];
  pageable: DigimonPageInfo;
}

export interface DigimonImage {
  href: string;
  transparent?: boolean;
}

export interface DigimonLevel {
  id: number;
  level: string;
}

export interface DigimonType {
  id: number;
  type: string;
}

export interface DigimonAttribute {
  id: number;
  attribute: string;
}

export interface DigimonField {
  id: number;
  field: string;
  image?: string;
}

export interface DigimonDescription {
  origin?: string;
  language: string;
  description: string;
}

export interface DigimonSkill {
  id?: number;
  skill: string;
  translation?: string;
  description?: string;
}

export interface DigimonEvolution {
  id: number;
  digimon: string;
  condition?: string;
  image?: string;
  url?: string;
}

/** Detalle completo: GET /digimon/{id}. Casi todos los campos pueden venir vacíos. */
export interface DigimonDetail {
  id: number;
  name: string;
  xAntibody?: boolean;
  releaseDate?: string;
  images?: DigimonImage[];
  levels?: DigimonLevel[];
  types?: DigimonType[];
  attributes?: DigimonAttribute[];
  fields?: DigimonField[];
  descriptions?: DigimonDescription[];
  skills?: DigimonSkill[];
  priorEvolutions?: DigimonEvolution[];
  nextEvolutions?: DigimonEvolution[];
}