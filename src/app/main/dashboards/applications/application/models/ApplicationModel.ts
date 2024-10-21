import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { Institution } from '../../InstitutionsApi';

/**
 * The product model.
 */
const ApplicationModel = (data: PartialDeep<Institution>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('institution-'),
		heiName: '', // Institution name starts as an empty string
		institutionDesignation: 'UNAM', // Default designation can be set to one of the available options, e.g., 'UNAM'
		phone: '', // Empty string for phone number initially
		email: '', // Empty string for email initially
		address: '',
		images: [],
		image: '',
		yearOfEstablishment: 0, // Set as 0 initially until updated with a valid year
		numberOfStudents: 0, // Initially 0 students
		location: '', // Empty string for location initially
		campuses: 0, // Initially set to 0 campuses
		website: '', // Empty string for website initially
		accreditationStatus: 'Accredited', // Default accreditation status can be set to 'Accredited'
		keyProgramsOffered: [],
		featuredImageId: '',
		handle: '',
		active: true


	});

export default ApplicationModel;
