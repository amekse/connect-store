import type { ApparelCatalogSortingOrder, PricingOption } from "./enums";

export type ApparelItem = {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
};
export type ApparelCatalog = ApparelItem[];

export type ActionBarState = {
  filterFree: boolean,
  filterPaid: boolean,
  filterViewOny: boolean,
  searchKeyword: string,
  filterMaxPricing: number,
  filterMinPricing: number,
  sortingOrder: ApparelCatalogSortingOrder
}

export type ActionbarStore = {
  originalList: ApparelCatalog
  showList: ApparelCatalog
  actionBarState: ActionBarState
  loading: boolean

  setFilterFree: () => void
  setFilterPaid: () => void
  setFilterViewOnly: () => void
  searchByKeyword: (keyword: string) => void
  setPricingMax: (value: number) => void
  setPricingMin: (value: number) => void
  resetFilters: () => void
  setSorting: (order: ApparelCatalogSortingOrder) => void
  initialize: (originalList: ApparelCatalog) => void
}