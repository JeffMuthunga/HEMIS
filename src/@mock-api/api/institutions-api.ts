import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../institutions-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { Institution } from '../../app/main/dashboards/institutions/InstitutionsApi';

let institutionsDB = mockApi.institutions.value as Institution[];

export const institutionApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/institutions/schools').reply(() => {
		console.log({institutionsDB})
		return [200, institutionsDB];
	});

	mock.onPost('/institutions/schools').reply(({ data }) => {
		const newInstitution = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as Institution;
		institutionsDB.unshift(newInstitution);
		return [200, newInstitution];
	});

	mock.onDelete('/institutions/schools').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];
		institutionsDB = institutionsDB.filter((item) => !ids.includes(item.id));
		return [200, institutionsDB];
	});

	mock.onGet('/institutions/schools/:id').reply((config) => {
		const { id } = config.params as Params;
		const institution = _.find(institutionsDB, { id });
		if (institution) {
			return [200, institution];
		}
		return [404, 'Requested institution does not exist.'];
	});

	mock.onPut('/institutions/schools/:id').reply((config) => {
		const { id } = config.params as Params;
		_.assign(_.find(institutionsDB, { id }), JSON.parse(config.data as string));
		return [200, _.find(institutionsDB, { id })];
	});

	mock.onDelete('/institutions/schools/:id').reply((config) => {
		const { id } = config.params as Params;
		_.remove(institutionsDB, { id });
		return [200, id];
	});

};
