import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { FacilitiesProduct } from '../../FacilitiesApi';

/**
 * The facilities model.
 */
const FacilitiesModel = (data: PartialDeep<FacilitiesProduct>) =>
  _.defaults(data || {}, {
    id: _.uniqueId('facility-'),
    academicYear: '',
    HEIName: '',
    HEICode: '',
    campusName: '',
    buildingName: '',
    roomNumber: '',
    spaceIdentifier: '',
    condition: '',
    assignableArea: 0, 
    usageType: '',
    occupancyCapacity: 0, 
    featuredImageId: '',
    images: [], 
    active: true,
  });

export default FacilitiesModel;
