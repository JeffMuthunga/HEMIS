import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
//import { FacilitiesOrder, FacilitiesProduct } from '../../app/main/apps/facilities/FacilitiesApi';

let productsDB = mockApi.components.examples.facilities_products.value as FacilitiesProduct[];
let ordersDB = mockApi.components.examples.facilities_orders.value as FacilitiesOrder[];

export const facilitiesApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/facilities/products').reply(() => {
		return [200, productsDB];
	});

	mock.onPost('/facilities/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as FacilitiesProduct;

		productsDB.unshift(newProduct);

		return [200, newProduct];
	});

	mock.onDelete('/facilities/products').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		productsDB = productsDB.filter((item) => !ids.includes(item.id));

		return [200, productsDB];
	});

	mock.onGet('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		const product = _.find(productsDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});

	mock.onPut('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(productsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(productsDB, { id })];
	});

	mock.onDelete('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(productsDB, { id });

		return [200, id];
	});

	mock.onGet('/facilities/orders').reply(() => {
		return [200, ordersDB];
	});

	mock.onPost('/facilities/orders').reply((config) => {
		const newOrder = { id: FuseUtils.generateGUID(), ...JSON.parse(config.data as string) } as FacilitiesOrder;

		ordersDB.push(newOrder);

		return [200, newOrder];
	});

	mock.onDelete('/facilities/orders').reply((config) => {
		const ids = JSON.parse(config.data as string) as string[];
		ordersDB = ordersDB.filter((item) => !ids.includes(item.id));

		return [200, ordersDB];
	});

	mock.onGet('/facilities/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		const order = _.find(ordersDB, { id });

		if (order) {
			return [200, order];
		}

		return [404, 'Requested order do not exist.'];
	});

	mock.onPut('/facilities/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(ordersDB, { id }), JSON.parse(config.data as string) as FacilitiesOrder);

		return [200, _.find(ordersDB, { id })];
	});

	mock.onDelete('/facilities/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(ordersDB, { id });

		return [200, id];
	});
};
