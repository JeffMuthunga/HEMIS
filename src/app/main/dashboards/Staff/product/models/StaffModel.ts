import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ProductsProduct } from '../../ProductsApi';

/**
 * The products model.
 */
const StaffModel = (data: PartialDeep<ProductsProduct>) =>
  _.defaults(data || {}, {
    id: _.uniqueId('staff-'),
    academicYear: '',
    PersonelId: '',
    StaffName: '',
    Surname: '',
    Sex: '',
    DateOfBirth: '',
    ContactInformation: '',
    TermsOfEmployment: '',
    ModeOfEmployment: 0, 
    DateOfEmployment: '',
    Department: 0, 
    featuredImageId: '',
    Qualification: '',
    images: [], 
    AcademicEmploymentFunction: '',
    active: true,
  });

export default StaffModel;
