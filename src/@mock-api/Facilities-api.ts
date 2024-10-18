import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import facilityAPI from '../@mock-api/facilities-api.json';
import ExtendedMockAdapter, { Params } from '../@mock-api/ExtendedMockAdapter';
import { FacilitiesProduct } from '../app/main/dashboards/Facilities/FacilitiesApi';

let facilitiesDB = facilityAPI.facilities.value as FacilitiesProduct[];


export const facilitiesApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/facilities/products').reply(() => {
		return [200, facilitiesDB];
	});

	mock.onPost('/facilities/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as FacilitiesProduct;

		facilitiesDB.unshift(newProduct);

		return [200, newProduct];
	});

	mock.onDelete('/facilities/products').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		facilitiesDB = facilitiesDB.filter((item) => !ids.includes(item.id));

		return [200, facilitiesDB];
	});

	mock.onGet('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		const product = _.find(facilitiesDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});

	mock.onPut('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(facilitiesDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(facilitiesDB, { id })];
	});

	mock.onDelete('/facilities/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(facilitiesDB, { id });

		return [200, id];
	});

	
};
