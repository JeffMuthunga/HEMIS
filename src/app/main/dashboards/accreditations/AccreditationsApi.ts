import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import AccreditationModel from './accreditation/models/AccreditationModel';

export const addTagTypes = ['accreditations', 'accreditation'] as const;

const AccreditationsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAccreditations: build.query<GetAccreditationsApiResponse, GetAccreditationsApiArg>({
				query: () => ({ url: `/mock-api/accreditations/all` }),
				providesTags: ['accreditations']
			}),
			deleteAccreditations: build.mutation<DeleteAccreditationsApiResponse, DeleteAccreditationsApiArg>({
				query: (productIds) => ({
					url: `/mock-api/accreditations/deleteAccreditation`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['accreditations']
			}),
			getAccreditation: build.query<GetAccreditationApiResponse, GetAccreditationApiArg>({
				query: (accreditationId) => ({
					url: `/mock-api/accreditations/all/${accreditationId}`
				}),
				providesTags: ['accreditation', 'accreditations']
			}),
			createAccreditation: build.mutation<CreateAccreditationApiResponse, CreateAccreditationApiArg>({
				query: (newAccreditation) => ({
					url: `/mock-api/accreditations/addAccreditation`,
					method: 'POST',
					data: AccreditationModel(newAccreditation)
				}),
				invalidatesTags: ['accreditations', 'accreditation']
			}),
			updateAccreditation: build.mutation<UpdateAccreditationApiResponse, UpdateAccreditationApiArg>({
				query: (accreditation) => ({
					// url: `/mock-api/Accreditations/all/${accreditation.id}`,
					// method: 'PUT',
					// data: accreditation
				}),
				invalidatesTags: ['accreditation', 'accreditations']
			}),
			deleteAccreditation: build.mutation<DeleteAccreditationApiResponse, DeleteAccreditationApiArg>({
				query: (accreditationId) => ({
					url: `/mock-api/accreditations/all/${accreditationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['accreditation', 'accreditations']
			})
		}),
		overrideExisting: false
	});

export default AccreditationsApi;

export type GetAccreditationsApiResponse = /** status 200 OK */ Accreditation[];
export type GetAccreditationsApiArg = void;

export type DeleteAccreditationsApiResponse = unknown;
export type DeleteAccreditationsApiArg = string[]; /** Accreditation ids */

export type GetAccreditationApiResponse = /** status 200 OK */ Accreditation;
export type GetAccreditationApiArg = string;

export type CreateAccreditationApiResponse = /** status 200 OK */ Accreditation;
export type CreateAccreditationApiArg = PartialDeep<Accreditation>;

export type UpdateAccreditationApiResponse = unknown;
export type UpdateAccreditationApiArg = Accreditation; // Accreditation

export type DeleteAccreditationApiResponse = unknown;
export type DeleteAccreditationApiArg = string; // Accreditation id

export type AccreditationImageType = {
	id: string;
	url: string;
	type: string;
};

export type Accreditation = {
	hei_name: string;
	site_and_contract_information: string;
	programme_name: string;
	nqf_level: string;
	credits: string;
	stakeholder_involvement: string;
	accreditation_status: string;
	year_of_accreditation: string;
	department: string;
	faculty: string;
	handle: string;

};

export const {
	useGetAccreditationsQuery,
	useDeleteAccreditationsMutation,
	useGetAccreditationQuery,
	useUpdateAccreditationMutation,
	useDeleteAccreditationMutation,
	useCreateAccreditationMutation
} = AccreditationsApi;

// export type ECommerceApiType = {
// 	[AccreditationsApi.reducerPath]: ReturnType<typeof AccreditationsApi.reducer>;
// };
