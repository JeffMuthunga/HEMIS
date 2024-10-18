import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import research from '../@mock-api/research-api.json';
import ExtendedMockAdapter, { Params } from '../@mock-api/ExtendedMockAdapter';
import { ResearchProduct } from '../app/main/dashboards/Research/ResearchApi';

let researchDB = research.research.value as ResearchProduct[];


export const researchApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/research/products').reply(() => {
		return [200, researchDB];
	});

	mock.onPost('/research/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as ResearchProduct;

		researchDB.unshift(newProduct);

		return [200, newProduct];
	});

	mock.onDelete('/research/products').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		researchDB = researchDB.filter((item) => !ids.includes(item.id));

		return [200, researchDB];
	});

	mock.onGet('/research/products/:id').reply((config) => {
		const { id } = config.params as Params;

		const product = _.find(researchDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});

	mock.onPut('/research/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(researchDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(researchDB, { id })];
	});

	mock.onDelete('/research/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(researchDB, { id });

		return [200, id];
	});

	
};
