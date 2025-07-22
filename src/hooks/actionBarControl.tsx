import { create } from 'zustand'
import type {
  ApparelCatalog,
  ActionBarState,
  ActionbarStore,
} from '../types'

import {
  ApparelCatalogSortingOrder,
  PricingOption,
} from '../enums'

const initialState: ActionBarState = {
  filterFree: false,
  filterPaid: false,
  filterViewOny: false,
  searchKeyword: '',
  filterMaxPricing: Infinity,
  filterMinPricing: 0,
  sortingOrder: ApparelCatalogSortingOrder.NAME,
}

const applyFiltersAndSorting = (items: ApparelCatalog, actionBarConfig: ActionBarState): ApparelCatalog => {
  return items
    .filter((item) => {
      const isFree = actionBarConfig.filterFree && item.pricingOption === PricingOption.FREE
      const isPaid = actionBarConfig.filterPaid && item.pricingOption === PricingOption.PAID
      const isViewOnly = actionBarConfig.filterViewOny && item.pricingOption === PricingOption.VIEW_ONLY

      const priceInRange = item.price >= actionBarConfig.filterMinPricing && item.price <= actionBarConfig.filterMaxPricing
      const matchesKeyword = item.title.toLowerCase().includes(actionBarConfig.searchKeyword.toLowerCase())

      const pricingFilterApplied = actionBarConfig.filterFree || actionBarConfig.filterPaid || actionBarConfig.filterViewOny
        ? isFree || isPaid || isViewOnly
        : true

      return priceInRange && matchesKeyword && pricingFilterApplied
    })
    .sort((a, b) => {
      switch (actionBarConfig.sortingOrder) {
        case ApparelCatalogSortingOrder.PRICEASC:
          return a.price - b.price
        case ApparelCatalogSortingOrder.PRICEDESC:
          return b.price - a.price
        case ApparelCatalogSortingOrder.NAME:
        default:
          return a.title.localeCompare(b.title)
      }
    })
}

const useActionbarControl = create<ActionbarStore>((set) => ({
  originalList: [],
  showList: [],
  actionBarState: { ...initialState },

  initialize: (list) => {
    set(() => ({
      originalList: list,
      showList: list,
    }))
  },

  setFilterFree: () => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterFree: !state.actionBarState.filterFree,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  setFilterPaid: () => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterPaid: !state.actionBarState.filterPaid,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  setFilterViewOnly: () => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterViewOny: !state.actionBarState.filterViewOny,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  searchByKeyword: (keyword) => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        searchKeyword: keyword,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  setPricingMax: (value) => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterMaxPricing: value,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  setPricingMin: (value) => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterMinPricing: value,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  resetFilters: () => {
    const updatedConfig = { ...initialState }
    set((state) => ({
      actionBarState: updatedConfig,
      showList: applyFiltersAndSorting(state.originalList, updatedConfig),
    }))
  },

  setSorting: (order) => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        sortingOrder: order,
      }
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },
}))

export default useActionbarControl;
