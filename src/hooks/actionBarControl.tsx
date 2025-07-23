import { create } from 'zustand'
import type {
  ActionBarState,
  ActionbarStore,
} from '../types'

import {
  ApparelCatalogSortingOrder
} from '../enums'
import { applyFiltersAndSorting } from '../utils/filterAndSort.utils'

import {
  getActionBarStateFromUrl,
  setActionBarStateToUrl
} from '../utils/actionBarUrlState.utils';

const initialState: ActionBarState = getActionBarStateFromUrl({
  filterFree: false,
  filterPaid: false,
  filterViewOny: false,
  searchKeyword: '',
  filterMaxPricing: 999,
  filterMinPricing: 0,
  sortingOrder: ApparelCatalogSortingOrder.NAME,
})

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
      setActionBarStateToUrl(updatedConfig)
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
      setActionBarStateToUrl(updatedConfig)
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
      setActionBarStateToUrl(updatedConfig)
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
      setActionBarStateToUrl(updatedConfig)
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
      setActionBarStateToUrl(updatedConfig)
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
      setActionBarStateToUrl(updatedConfig)
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  resetFilters: () => {
    const updatedConfig = {
      filterFree: false,
      filterPaid: false,
      filterViewOny: false,
      searchKeyword: '',
      filterMaxPricing: 999,
      filterMinPricing: 0,
      sortingOrder: ApparelCatalogSortingOrder.NAME,
    }
    set((state) => {
      setActionBarStateToUrl(updatedConfig)
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },

  setSorting: (order) => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        sortingOrder: order,
      }
      setActionBarStateToUrl(updatedConfig)
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
      }
    })
  },
}))

export default useActionbarControl;