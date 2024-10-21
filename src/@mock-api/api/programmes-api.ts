import _ from '@lodash';
import FuseUtils from '@fuse/utils';
// import mockApi from '../mock-api.json';
import programmesMockApi from '../programmes-api.json'
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import programme from "../../app/main/dashboards/programmes/programme/Programme";
import ProgrammesApi, {Programme} from "../../app/main/dashboards/programmes/ProgrammesApi";

let programmesDB = programmesMockApi.programmes.value as Programme[];

export const programmeApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/programmes/all').reply(() => {
		console.log({programmesDB})
		return [200, programmesDB];
	});

	// mock.onPost('/programmes/addprogramme').reply(({ data }) => {
	// 	const newprogramme = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as programme;
	//
	// 	programmesDB.unshift(newprogramme);
	//
	// 	return [200, newprogramme];
	// });

	// mock.onDelete('/programmes/deleteprogramme').reply(({ data }) => {
	// 	const ids = JSON.parse(data as string) as string[];
	//
	// 	programmesDB = programmesDB.filter((item) => !ids.includes(item.id));
	//
	// 	return [200, programmesDB];
	// });
	// mock.onGet('/programmes/all/:id').reply((config) => {
	// 	const { id } = config.params as Params;
	//
	// 	const programme = _.find(programmesDB, { id });
	//
	// 	if (programme) {
	// 		return [200, programme];
	// 	}
	//
	// 	return [404, 'Requested programme does not exist.'];
	// });
	// mock.onPut('/programmes/all/:id').reply((config) => {
	// 	const { id } = config.params as Params;
	//
	// 	_.assign(_.find(programmesDB, { id }), JSON.parse(config.data as string));
	//
	// 	return [200, _.find(programmesDB, { id })];
	// });
	// mock.onDelete('/programmes/all/:id').reply((config) => {
	// 	const { id } = config.params as Params;
	//
	// 	_.remove(programmesDB, { id });
	//
	// 	return [200, id];
	// });
};
