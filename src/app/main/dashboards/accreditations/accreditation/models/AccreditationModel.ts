import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { Accreditation } from '../../AccreditationsApi';

/**
 * The product model.
 */
const AccreditationModel = (data: PartialDeep<Accreditation>) =>
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

export default AccreditationModel;
