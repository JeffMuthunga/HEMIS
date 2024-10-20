import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { Student } from '../../StudentsApi';

/**
 * The product model.
 */
const StudentModel = (data: PartialDeep<Student>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('student-'),
		heiName: '',
		address: '',
		programmeName: '',
		nqfLevel: '',
		credits: '',
		stakeholderInvolment: '',
		accreditationStatus: '',
		yearofAccreditation: '',
		department: '',
		faculty: '',
		handle: '',
		active: true

	});

export default StudentModel;
