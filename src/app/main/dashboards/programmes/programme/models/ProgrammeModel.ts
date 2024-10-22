import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { Programme } from '../../ProgrammesApi';

/**
 * The product model.
 */
const ProgrammeModel = (data: PartialDeep<Programme>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('student-'),
		handle: '',
		academicYear: '',
		studentIdentifier: '',
		name: '',
		surname: '',
		dateOfBirth: '',
		sex: 'Other',
		email: '',
		mobileNo: '',
		qualificationCode: '',
		faculty: '',
		department: '',
		marginalized: 'No',
		disability: 'None',
		sourceOfFunding: 'Scholarship',
		examinationGrade: '',
		active: true,
		featuredImageId: '',
		images: []
	});

export default ProgrammeModel;
