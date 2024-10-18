import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import facilityAPI from './staff-api.json';
import ExtendedMockAdapter, { Params } from '../@mock-api/ExtendedMockAdapter';
import { StaffProduct } from '../app/main/dashboards/Staff/StaffApi';

let staffDB = facilityAPI.staff.value as StaffProduct[];


export const staffApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/staff/products').reply(() => {
		return [200, staffDB];
	});

	mock.onPost('/staff/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as StaffProduct;

		staffDB.unshift(newProduct);

		return [200, newProduct];
	});

	mock.onDelete('/staff/products').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		staffDB = staffDB.filter((item) => !ids.includes(item.id));

		return [200, staffDB];
	});

	mock.onGet('/staff/products/:id').reply((config) => {
		const { id } = config.params as Params;

		const product = _.find(staffDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});

	mock.onPut('/staff/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(staffDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(staffDB, { id })];
	});

	mock.onDelete('/staff/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(staffDB, { id });

		return [200, id];
	});

	
};
