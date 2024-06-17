export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type TSearchPizzaParams = {
  sortBy: string;
  order: string;
  categoryId: number;
  search: string;
  currentPage: number;
};

export type TFetchPizzasParams = {
  sortBy: string;
  order: string;
  category: string | null;
  search: string;
  currentPage: number;
};

export interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}
