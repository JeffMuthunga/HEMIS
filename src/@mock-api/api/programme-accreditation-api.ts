import _ from '@lodash';
import FuseUtils from '@fuse/utils';
// import mockApi from '../mock-api.json';
import studentsMockApi from '../students-api.json'
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { Student } from '../../app/main/dashboards/students/StudentsApi';

let studentsDB = studentsMockApi.students as Student[];

export const studentApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/students/all').reply(() => {
		console.log({studentsDB})
		return [200, studentsDB];
	});

	mock.onPost('/students/addStudent').reply(({ data }) => {
		const newStudent = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as Student;

		studentsDB.unshift(newStudent);

		return [200, newStudent];
	});

	mock.onDelete('/students/deleteStudent').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		studentsDB = studentsDB.filter((item) => !ids.includes(item.id));

		return [200, studentsDB];
	});

	mock.onGet('/students/all/:id').reply((config) => {
		const { id } = config.params as Params;

		const student = _.find(studentsDB, { id });

		if (student) {
			return [200, student];
		}

		return [404, 'Requested student does not exist.'];
	});

	mock.onPut('/students/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(studentsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(studentsDB, { id })];
	});

	mock.onDelete('/students/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(studentsDB, { id });

		return [200, id];
	});
};
