import { create } from 'zustand'
import type {
  ActionBarState,
  ActionbarStore,
} from '../types'

import {
  ApparelCatalogSortingOrder
} from '../enums'
import { applyFiltersAndSorting } from '../utils'

const initialState: ActionBarState = {
  filterFree: false,
  filterPaid: false,
  filterViewOny: false,
  searchKeyword: '',
  filterMaxPricing: 999,
  filterMinPricing: 0,
  sortingOrder: ApparelCatalogSortingOrder.NAME,
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
