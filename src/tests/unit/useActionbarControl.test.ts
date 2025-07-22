import { act } from '@testing-library/react';
import { afterEach, describe, expect, it, beforeEach } from '@jest/globals';
import useActionbarControl from '../../hooks/actionBarControl';
import { PricingOption, ApparelCatalogSortingOrder } from '../../enums';
import type { ApparelItem } from '../../types';
import { cleanup } from '@testing-library/react';

const itemA: ApparelItem = {
  id: '1',
  creator: 'Alice',
  title: 'Alpha Shirt',
  pricingOption: PricingOption.FREE,
  imagePath: '/alpha.jpg',
  price: 0,
}

const itemB: ApparelItem = {
  id: '2',
  creator: 'Bob',
  title: 'Beta Pants',
  pricingOption: PricingOption.PAID,
  imagePath: '/beta.jpg',
  price: 50,
}

const itemC: ApparelItem = {
  id: '3',
  creator: 'Charlie',
  title: 'Gamma Hat',
  pricingOption: PricingOption.VIEW_ONLY,
  imagePath: '/gamma.jpg',
  price: 25,
}

const mockList = [itemA, itemB, itemC]

beforeEach(() => {
  act(() => {
    useActionbarControl.getState().initialize(mockList)
  })
})

afterEach(() => {
  cleanup()
  // reset Zustand store state
  const { resetFilters } = useActionbarControl.getState()
  act(() => resetFilters())
})

describe('useActionbarControl store', () => {
  it('initializes with given list', () => {
    const { originalList, showList } = useActionbarControl.getState()
    expect(originalList).toEqual(mockList)
    expect(showList).toEqual(mockList)
  })

  it('toggles filterFree and filters correctly', () => {
    act(() => {
      useActionbarControl.getState().setFilterFree()
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemA])
  })

  it('toggles filterPaid and filters correctly', () => {
    act(() => {
      useActionbarControl.getState().setFilterPaid()
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemB])
  })

  it('toggles filterViewOnly and filters correctly', () => {
    act(() => {
      useActionbarControl.getState().setFilterViewOnly()
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemC])
  })

  it('filters by multiple pricing options together', () => {
    act(() => {
      useActionbarControl.getState().setFilterFree()
      useActionbarControl.getState().setFilterPaid()
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemA, itemB])
  })

  it('filters by search keyword', () => {
    act(() => {
      useActionbarControl.getState().searchByKeyword('Gamma')
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemC])
  })

  it('applies pricing min filter correctly', () => {
    act(() => {
      useActionbarControl.getState().setPricingMin(30)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemB])
  })

  it('applies pricing max filter correctly', () => {
    act(() => {
      useActionbarControl.getState().setPricingMax(10)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemA])
  })

  it('applies both min and max price filters together', () => {
    act(() => {
      useActionbarControl.getState().setPricingMin(10)
      useActionbarControl.getState().setPricingMax(30)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList).toEqual([itemC])
  })

  it('applies sorting by NAME', () => {
    act(() => {
      useActionbarControl.getState().setSorting(ApparelCatalogSortingOrder.NAME)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList.map(i => i.title)).toEqual(['Alpha Shirt', 'Beta Pants', 'Gamma Hat'])
  })

  it('applies sorting by PRICE ASCENDING', () => {
    act(() => {
      useActionbarControl.getState().setSorting(ApparelCatalogSortingOrder.PRICEASC)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList.map(i => i.price)).toEqual([0, 25, 50])
  })

  it('applies sorting by PRICE DESCENDING', () => {
    act(() => {
      useActionbarControl.getState().setSorting(ApparelCatalogSortingOrder.PRICEDESC)
    })
    const { showList } = useActionbarControl.getState()
    expect(showList.map(i => i.price)).toEqual([50, 25, 0])
  })

  it('resets all filters to initial state', () => {
    act(() => {
      useActionbarControl.getState().setFilterFree()
      useActionbarControl.getState().searchByKeyword('Gamma')
      useActionbarControl.getState().setPricingMax(10)
      useActionbarControl.getState().setSorting(ApparelCatalogSortingOrder.PRICEDESC)
      useActionbarControl.getState().resetFilters()
    })
    const { showList, actionBarState } = useActionbarControl.getState()
    expect(showList).toEqual(mockList)
    expect(actionBarState.filterFree).toBe(false)
    expect(actionBarState.filterPaid).toBe(false)
    expect(actionBarState.searchKeyword).toBe('')
    expect(actionBarState.sortingOrder).toBe(ApparelCatalogSortingOrder.NAME)
    expect(actionBarState.filterMaxPricing).toBe(Infinity)
  })
})
