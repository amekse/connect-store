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

const initialState: ActionBarState = getActionBarStateFromUrl();

const useActionbarControl = create<ActionbarStore>((set) => ({
  originalList: [],
  showList: [],
  actionBarState: { ...initialState },

  initialize: (list) => {
    set((state) => ({
      originalList: list,
      showList: applyFiltersAndSorting(list, state.actionBarState),
    }))
  },

  setFilterFree: () => {
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        filterFree: !state.actionBarState.filterFree,
      }
      if (updatedConfig.filterPaid) {
        updatedConfig.filterMaxPricing = 999;
        updatedConfig.filterMinPricing = 0;
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
      if (!updatedConfig.filterPaid) {
        updatedConfig.filterMaxPricing = 999;
        updatedConfig.filterMinPricing = 0;
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
      if (updatedConfig.filterPaid) {
        updatedConfig.filterMaxPricing = 999;
        updatedConfig.filterMinPricing = 0;
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
      if (state.actionBarState.filterPaid) {
        const updatedConfig = {
          ...state.actionBarState,
          filterMaxPricing: value,
        }
        setActionBarStateToUrl(updatedConfig)
        return {
          actionBarState: updatedConfig,
          showList: applyFiltersAndSorting(state.originalList, updatedConfig),
        }
      } else {
        return {
          loading: true
        }
      }
    })
  },

  setPricingMin: (value) => {
    set((state) => {
      if (state.actionBarState.filterPaid) {
        const updatedConfig = {
          ...state.actionBarState,
          filterMinPricing: value,
        }
        setActionBarStateToUrl(updatedConfig)
        return {
          actionBarState: updatedConfig,
          showList: applyFiltersAndSorting(state.originalList, updatedConfig),
        }
      } else {
        return {
          loading: false
        }
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