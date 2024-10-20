import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ResearchProduct } from '../../ResearchApi';

/**
 * The products model.
 */
const ResearchModel = (data: PartialDeep<ResearchProduct>) =>
  _.defaults(data || {}, {
    id: _.uniqueId('research-'),
    researchTitle: '',
    typeOfResearchOutcome: '',
    namesOfResearchers: '',
    areasfResearch: '',
    academicYear: '',
    heiDetails: '',
    publicationDate: '',
    journalConferenceDate: '',
    volumeIssue: 0, 
    pages: '',
    DOI: "", 
    featuredImageId: '',
    fundingScore: '',
    images: [], 
    abstract: '',
    active: true,
  });

export default ResearchModel;
