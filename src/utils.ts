import { ApparelCatalogSortingOrder, PricingOption } from "./enums";
import type { ActionBarState, ApparelCatalog } from "./types";

function pricingOptionFilter(list:ApparelCatalog, criteria: {filterPaid: boolean, filterFree: boolean, filterViewOny: boolean}): ApparelCatalog {
    let filterCritera = [];
    if (criteria.filterFree) filterCritera.push(PricingOption.PAID);
    if (criteria.filterPaid) filterCritera.push(PricingOption.FREE);
    if (criteria.filterViewOny) filterCritera.push(PricingOption.VIEW_ONLY);

    return list.filter((item) => filterCritera.includes(item.pricingOption));
}

function keywordFilter(list: ApparelCatalog, criteria: string): ApparelCatalog {
    if (!!criteria && criteria.trim() !== "") {
        return list.filter((item) => item.title.includes(criteria) || item.creator.includes(criteria));
    }
    return list;
}

function priceMinFilter(list: ApparelCatalog, criteria: number): ApparelCatalog {
    return list.filter((item) => item.price >= criteria);
}

function priceMaxFilter(list:ApparelCatalog, criteria:number): ApparelCatalog {
    return list.filter((item) => item.price <= criteria);
}

function sortByName(list: ApparelCatalog): ApparelCatalog {
    return list.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByPriceLowToHigh(list: ApparelCatalog): ApparelCatalog {
    return list.sort((a, b) => a.price - b.price);
}

function sortByPriceHighToLow(list: ApparelCatalog): ApparelCatalog {
    return list.sort((a, b) => b.price - a.price);
}

function applyFilter(list: ApparelCatalog, criteria: {filterFree: boolean, filterPaid: boolean, filterViewOny: boolean, searchKeyword: string, filterMaxPricing: number, filterMinPricing: number}): ApparelCatalog {
    let filtered = pricingOptionFilter(list, {...criteria});
    filtered = keywordFilter(filtered, criteria.searchKeyword);
    filtered = priceMinFilter(filtered, criteria.filterMinPricing);
    filtered = priceMaxFilter(filtered, criteria.filterMaxPricing);

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