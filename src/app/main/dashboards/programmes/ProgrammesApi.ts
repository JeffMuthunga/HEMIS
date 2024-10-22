import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import ProgrammeModel from './programme/models/ProgrammeModel';

export const addTagTypes = ['programmes', 'programme'] as const;

const ProgrammesApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProgrammes: build.query<GetProgrammesApiResponse, GetProgrammesApiArg>({
				query: () => ({ url: `/mock-api/programmes/all` }),
				providesTags: ['programmes']
			}),
			deleteProgrammes: build.mutation<DeleteProgrammesApiResponse, DeleteProgrammesApiArg>({
				query: (productIds) => ({
					url: `/mock-api/programmes/deleteProgramme`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['programmes']
			}),
			getProgramme: build.query<GetProgrammeApiResponse, GetProgrammeApiArg>({
				query: (programmeId) => ({
					url: `/mock-api/programmes/all/${programmeId}`
				}),
				providesTags: ['programme', 'programmes']
			}),
			createProgramme: build.mutation<CreateProgrammeApiResponse, CreateProgrammeApiArg>({
				query: (newProgramme) => ({
					url: `/mock-api/programmes/addProgramme`,
					method: 'POST',
					data: ProgrammeModel(newProgramme)
				}),
				invalidatesTags: ['programmes', 'programme']
			}),
			updateProgramme: build.mutation<UpdateProgrammeApiResponse, UpdateProgrammeApiArg>({
				query: (programme) => ({
					// url: `/mock-api/Programmes/all/${programme.id}`,
					// method: 'PUT',
					// data: programme
				}),
				invalidatesTags: ['programme', 'programmes']
			}),
			deleteProgramme: build.mutation<DeleteProgrammeApiResponse, DeleteProgrammeApiArg>({
				query: (programmeId) => ({
					url: `/mock-api/programmes/all/${programmeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['programme', 'programmes']
			})
		}),
		overrideExisting: false
	});

export default ProgrammesApi;

export type GetProgrammesApiResponse = /** status 200 OK */ Programme[];
export type GetProgrammesApiArg = void;

export type DeleteProgrammesApiResponse = unknown;
export type DeleteProgrammesApiArg = string[]; /** Programme ids */

export type GetProgrammeApiResponse = /** status 200 OK */ Programme;
export type GetProgrammeApiArg = string;

export type CreateProgrammeApiResponse = /** status 200 OK */ Programme;
export type CreateProgrammeApiArg = PartialDeep<Programme>;

export type UpdateProgrammeApiResponse = unknown;
export type UpdateProgrammeApiArg = Programme; // Programme

export type DeleteProgrammeApiResponse = unknown;
export type DeleteProgrammeApiArg = string; // Programme id

export type ProgrammeImageType = {
	id: string;
	url: string;
	type: string;
};

export type Programme = {

	hei_name: string;
	campus_name: string;
	faculty_and_department: string;
	qualification_name: string;
	qualification_type: string;
	nqf_level: string;
	number_of_credits: string;
	accreditation_status: string;
	program_duration: string;
	mode_of_study: string;
	handle: string;

};

export const {
	useGetProgrammesQuery,
	useDeleteProgrammesMutation,
	useGetProgrammeQuery,
	useUpdateProgrammeMutation,
	useDeleteProgrammeMutation,
	useCreateProgrammeMutation
} = ProgrammesApi;

// export type ECommerceApiType = {
// 	[ProgrammesApi.reducerPath]: ReturnType<typeof ProgrammesApi.reducer>;
// };
