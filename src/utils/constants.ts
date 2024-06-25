import { SortPropertyEnum, TSort } from "../redux/filter/types";

export const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые'];

export const sortList: TSort[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности-', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене-', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту-', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const typeNames: string[] = ['тонкое', 'традиционное'];