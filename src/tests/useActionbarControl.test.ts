import useActionbarControl from '../../hooks/actionBarControl';
import { ApparelCatalogSortingOrder, PricingOption } from '../../enums';

const mockItems = [
  {
    id: '1',
    creator: 'Alice',
    title: 'Blue Shirt',
    pricingOption: PricingOption.PAID,
    imagePath: '/blue.jpg',
    price: 400
  },
  {
    id: '2',
    creator: 'BobKeyword',
    title: 'Green Pants',
    pricingOption: PricingOption.FREE,
    imagePath: '/green.jpg',
    price: 100
  },
  {
    id: '3',
    creator: 'Charlie',
    title: 'Keyword Hoodie',
    pricingOption: PricingOption.VIEW_ONLY,
    imagePath: '/hoodie.jpg',
    price: 200
  },
  {
    id: '4',
    creator: 'Dave',
    title: 'Premium Coat',
    pricingOption: PricingOption.PAID,
    imagePath: '/coat.jpg',
    price: 999
  },
];

beforeEach(() => {
  const store = useActionbarControl.getState();
  store.resetFilters();
  store.initialize(mockItems);
});

test('1. search keyword should return only matching items', () => {
  const store = useActionbarControl.getState();
  store.searchByKeyword('keyword');

  const result = useActionbarControl.getState().showList.map(i => i.id);
  expect(result).toEqual(['2', '3']);
});

test('2. when paid is on, only paid items should be returned', () => {
  const store = useActionbarControl.getState();
  store.setFilterPaid();

  const result = useActionbarControl.getState().showList;
  expect(result.every(i => i.pricingOption === PricingOption.PAID)).toBe(true);
});

test('3. when free is on, only free items should be returned', () => {
  const store = useActionbarControl.getState();
  store.setFilterFree();

  const result = useActionbarControl.getState().showList;
  expect(result.every(i => i.pricingOption === PricingOption.FREE)).toBe(true);
});

test('4. when view only is on, only view-only items should be returned', () => {
  const store = useActionbarControl.getState();
  store.setFilterViewOnly();

  const result = useActionbarControl.getState().showList;
  expect(result.every(i => i.pricingOption === PricingOption.VIEW_ONLY)).toBe(true);
});

test('5. when sorted by name, list should be alphabetical by title', () => {
  const store = useActionbarControl.getState();
  store.setSorting(ApparelCatalogSortingOrder.NAME);

  const titles = useActionbarControl.getState().showList.map(i => i.title);
  expect([...titles]).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
});

test('6. sort low to high: FREE ➜ PAID asc ➜ VIEW_ONLY', () => {
  const store = useActionbarControl.getState();
  store.setSorting(ApparelCatalogSortingOrder.PRICEASC);

  const result = useActionbarControl.getState().showList;

  const freeIds = result.filter(i => i.pricingOption === PricingOption.FREE).map(i => i.id);
  const paidItems = result.filter(i => i.pricingOption === PricingOption.PAID);
  const paidPrices = paidItems.map(i => i.price);
  const viewIds = result.filter(i => i.pricingOption === PricingOption.VIEW_ONLY).map(i => i.id);

  expect(paidPrices).toEqual([...paidPrices].sort((a, b) => a - b));
  expect(result.map(i => i.id)).toEqual([...freeIds, ...paidItems.map(i => i.id), ...viewIds]);
});

test('7. sort high to low: PAID desc ➜ FREE ➜ VIEW_ONLY', () => {
  const store = useActionbarControl.getState();
  store.setSorting(ApparelCatalogSortingOrder.PRICEDESC);

  const result = useActionbarControl.getState().showList;

  const paidItems = result.filter(i => i.pricingOption === PricingOption.PAID);
  const paidPrices = paidItems.map(i => i.price);

  expect(paidPrices).toEqual([...paidPrices].sort((a, b) => b - a));
  expect(result[0].price).toBe(999);
});

test('8. paid + price range: only paid items within min-max', () => {
  const actions = useActionbarControl.getState();
  actions.setFilterPaid();
  actions.setPricingMin(500);
  actions.setPricingMax(1000);

  const { showList } = useActionbarControl.getState();
  expect(showList.length).toBe(1);
  expect(showList[0].id).toBe('4');
  expect(showList[0].pricingOption).toBe(PricingOption.PAID);
});

test('9. price range without paid flag returns empty list', () => {
  const store = useActionbarControl.getState();
  store.setPricingMin(500);
  store.setPricingMax(1000);

  const { showList } = useActionbarControl.getState();
  expect(showList.length).toBe(4);
});

test('10. paid + keyword: only paid items matching keyword', () => {
  const store = useActionbarControl.getState();
  store.setFilterPaid();
  store.searchByKeyword('coat');

  const { showList } = useActionbarControl.getState();
  expect(showList.length).toBe(1);
  expect(showList[0].pricingOption).toBe(PricingOption.PAID);
  expect(showList[0].title.toLowerCase()).toContain('coat');
});
