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
  loading: false,

  initialize: (list) => {
    set({loading: true});
    set((state) => ({
      originalList: list,
      showList: applyFiltersAndSorting(list, state.actionBarState),
      loading: false,
    }))
  },

  setFilterFree: () => {
    set({loading: true});
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
        loading: false,
      }
    })
  },

  setFilterPaid: () => {
    set({loading: true});
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
        loading: false,
      }
    })
  },

  setFilterViewOnly: () => {
    set({loading: true});
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
        loading: false,
      }
    })
  },

  searchByKeyword: (keyword) => {
    set({loading: true});
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        searchKeyword: keyword,
      }
      setActionBarStateToUrl(updatedConfig)
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
        loading: false,
      }
    })
  },

  setPricingMax: (value) => {
    set({loading: true});
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
          loading: false,
        }
      } else {
        return {
          loading: true
        }
      }
    })
  },

  setPricingMin: (value) => {
    set({loading: true});
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
          loading: false,
        }
      } else {
        return {
          loading: false
        }
      }
    })
  },

  resetFilters: () => {
    set({loading: true});
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
        loading: false,
      }
    })
  },

  setSorting: (order) => {
    set({loading: true});
    set((state) => {
      const updatedConfig = {
        ...state.actionBarState,
        sortingOrder: order,
      }
      setActionBarStateToUrl(updatedConfig)
      return {
        actionBarState: updatedConfig,
        showList: applyFiltersAndSorting(state.originalList, updatedConfig),
        loading: false,
      }
    })
  },
}))

export default useActionbarControl;