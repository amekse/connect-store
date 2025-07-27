import { ApparelCatalogSortingOrder, PricingOption } from "../enums";
import type { ActionBarState, ApparelCatalog } from "../types";

function pricingOptionFilter(list:ApparelCatalog, criteria: {filterPaid: boolean, filterFree: boolean, filterViewOny: boolean}): ApparelCatalog {
    let filterCritera = [];
    if (criteria.filterFree) filterCritera.push(PricingOption.FREE);
    if (criteria.filterPaid) filterCritera.push(PricingOption.PAID);
    if (criteria.filterViewOny) filterCritera.push(PricingOption.VIEW_ONLY);

    if (filterCritera.length === 0) return list;
    return list.filter((item) => filterCritera.includes(item.pricingOption));
}

function keywordFilter(list: ApparelCatalog, criteria: string): ApparelCatalog {
    if (!!criteria && criteria.trim() !== "") {
        return list.filter((item) => item.title.toLocaleLowerCase().includes(criteria.toLocaleLowerCase()) || item.creator.toLocaleLowerCase().includes(criteria.toLocaleLowerCase()));
    }
    return list;
}

function priceMinFilter(list: ApparelCatalog, criteria: {filterPaid: boolean, filterMinPricing: number}): ApparelCatalog {
    if (criteria.filterPaid) {
        return list.filter((item) => item.pricingOption === PricingOption.PAID && item.price >= criteria.filterMinPricing);
    } else {
        return list;
    }
}

function priceMaxFilter(list:ApparelCatalog, criteria: {filterPaid: boolean, filterMaxPricing: number}): ApparelCatalog {
    if (criteria.filterPaid) {
        return list.filter((item) => item.pricingOption === PricingOption.PAID && item.price <= criteria.filterMaxPricing);
    } else {
        return list;
    }
}

function sortByName(list: ApparelCatalog): ApparelCatalog {
    return list.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByPriceLowToHigh(list: ApparelCatalog): ApparelCatalog {
    const freeItems = list.filter(item => item.pricingOption === PricingOption.FREE);
    const paidItems = list
        .filter(item => item.pricingOption === PricingOption.PAID)
        .sort((a, b) => a.price - b.price);
    const viewOnlyItems = list.filter(item => item.pricingOption === PricingOption.VIEW_ONLY);

    return [...freeItems, ...paidItems, ...viewOnlyItems];
}

function sortByPriceHighToLow(list: ApparelCatalog): ApparelCatalog {
    const paidItems = list
        .filter(item => item.pricingOption === PricingOption.PAID)
        .sort((a, b) => b.price - a.price);
    const freeItems = list.filter(item => item.pricingOption === PricingOption.FREE);
    const viewOnlyItems = list.filter(item => item.pricingOption === PricingOption.VIEW_ONLY);

    return [...paidItems, ...freeItems, ...viewOnlyItems];
}

function applyFilter(list: ApparelCatalog, criteria: {filterFree: boolean, filterPaid: boolean, filterViewOny: boolean, searchKeyword: string, filterMaxPricing: number, filterMinPricing: number}): ApparelCatalog {
    let filtered = pricingOptionFilter(list, {...criteria});
    filtered = keywordFilter(filtered, criteria.searchKeyword);
    filtered = priceMinFilter(filtered, {...criteria});
    filtered = priceMaxFilter(filtered, {...criteria});

    return filtered;
}

function applySort(list: ApparelCatalog, sortingOrder: ApparelCatalogSortingOrder): ApparelCatalog {
    switch(sortingOrder) {
        case ApparelCatalogSortingOrder.PRICEASC: return sortByPriceLowToHigh(list);
        case ApparelCatalogSortingOrder.PRICEDESC: return sortByPriceHighToLow(list);
        case ApparelCatalogSortingOrder.NAME: 
        default: return sortByName(list);
    }
}

export function applyFiltersAndSorting(list: ApparelCatalog, actionBarConfig: ActionBarState): ApparelCatalog {
    const filtered = applyFilter(list, {...actionBarConfig});
    const sorted = applySort(filtered, actionBarConfig.sortingOrder);

    return sorted;
}