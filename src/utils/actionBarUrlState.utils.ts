import { ApparelCatalogSortingOrder } from "../enums";
import type { ActionBarState } from "../types";

const KEYS = {
  filterFree: 'ff',
  filterPaid: 'fp',
  filterViewOny: 'fv',
  searchKeyword: 'q',
  filterMaxPricing: 'max',
  filterMinPricing: 'min',
  sortingOrder: 'sort',
};

export function getActionBarStateFromUrl(): ActionBarState {
  const params = new URLSearchParams(window.location.search);

  return {
    filterFree: params.get(KEYS.filterFree) === '1',
    filterPaid: params.get(KEYS.filterPaid) === '1',
    filterViewOny: params.get(KEYS.filterViewOny) === '1',
    searchKeyword: params.get(KEYS.searchKeyword) ?? '',
    filterMaxPricing: parseFloat(params.get(KEYS.filterMaxPricing) ?? '999'),
    filterMinPricing: parseFloat(params.get(KEYS.filterMinPricing) ?? '0'),
    sortingOrder: (params.get(KEYS.sortingOrder) as ApparelCatalogSortingOrder) ?? ApparelCatalogSortingOrder.NAME,
  };
}

export function setActionBarStateToUrl(state: ActionBarState) {
  const params = new URLSearchParams();

  params.set(KEYS.filterFree, state.filterFree ? '1' : '0');
  params.set(KEYS.filterPaid, state.filterPaid ? '1' : '0');
  params.set(KEYS.filterViewOny, state.filterViewOny ? '1' : '0');
  params.set(KEYS.searchKeyword, state.searchKeyword);
  params.set(KEYS.filterMaxPricing, state.filterMaxPricing.toString());
  params.set(KEYS.filterMinPricing, state.filterMinPricing.toString());
  params.set(KEYS.sortingOrder, state.sortingOrder);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}
