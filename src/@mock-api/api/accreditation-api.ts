import _ from '@lodash';
import FuseUtils from '@fuse/utils';
// import mockApi from '../mock-api.json';
import accreditationsMockApi from '../accreditations-api.json'
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import accreditation from "../../app/main/dashboards/accreditations/accreditation/Accreditation";
import AccreditationsApi from "../../app/main/dashboards/accreditations/AccreditationsApi";

let accreditationsDB = accreditationsMockApi.accreditations.value as AccreditationsApi[];

export const accreditationApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/accreditations/all').reply(() => {
		console.log({accreditationsDB})
		return [200, accreditationsDB];
	});

	mock.onPost('/accreditations/addaccreditation').reply(({ data }) => {
		const newaccreditation = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as accreditation;

		accreditationsDB.unshift(newaccreditation);

		return [200, newaccreditation];
	});

	mock.onDelete('/accreditations/deleteaccreditation').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		accreditationsDB = accreditationsDB.filter((item) => !ids.includes(item.id));

		return [200, accreditationsDB];
	});

	mock.onGet('/accreditations/all/:id').reply((config) => {
		const { id } = config.params as Params;

		const accreditation = _.find(accreditationsDB, { id });

		if (accreditation) {
			return [200, accreditation];
		}

		return [404, 'Requested accreditation does not exist.'];
	});

	mock.onPut('/accreditations/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(accreditationsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(accreditationsDB, { id })];
	});

	mock.onDelete('/accreditations/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(accreditationsDB, { id });

		return [200, id];
	});
};
