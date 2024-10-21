import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import IndicatorModel from './indicator/models/IndicatorModel';

export const addTagTypes = ['indicators', 'indicator'] as const;

const IndicatorsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getIndicators: build.query<GetIndicatorsApiResponse, GetIndicatorsApiArg>({
				query: () => ({ url: `/mock-api/indicators/all` }),
				providesTags: ['indicators']
			}),
			deleteIndicators: build.mutation<DeleteIndicatorsApiResponse, DeleteIndicatorsApiArg>({
				query: (productIds) => ({
					url: `/mock-api/indicators/deleteIndicator`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['indicators']
			}),
			getIndicator: build.query<GetIndicatorApiResponse, GetIndicatorApiArg>({
				query: (indicatorId) => ({
					url: `/mock-api/indicators/all/${indicatorId}`
				}),
				providesTags: ['indicator', 'indicators']
			}),
			createIndicator: build.mutation<CreateIndicatorApiResponse, CreateIndicatorApiArg>({
				query: (newIndicator) => ({
					url: `/mock-api/indicators/addIndicator`,
					method: 'POST',
					data: IndicatorModel(newIndicator)
				}),
				invalidatesTags: ['indicators', 'indicator']
			}),
			updateIndicator: build.mutation<UpdateIndicatorApiResponse, UpdateIndicatorApiArg>({
				query: (indicator) => ({
					// url: `/mock-api/Indicators/all/${indicator.id}`,
					// method: 'PUT',
					// data: indicator
				}),
				invalidatesTags: ['indicator', 'indicators']
			}),
			deleteIndicator: build.mutation<DeleteIndicatorApiResponse, DeleteIndicatorApiArg>({
				query: (indicatorId) => ({
					url: `/mock-api/indicators/all/${indicatorId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['indicator', 'indicators']
			})
		}),
		overrideExisting: false
	});

export default IndicatorsApi;

export type GetIndicatorsApiResponse = /** status 200 OK */ Indicator[];
export type GetIndicatorsApiArg = void;

export type DeleteIndicatorsApiResponse = unknown;
export type DeleteIndicatorsApiArg = string[]; /** Indicator ids */

export type GetIndicatorApiResponse = /** status 200 OK */ Indicator;
export type GetIndicatorApiArg = string;

export type CreateIndicatorApiResponse = /** status 200 OK */ Indicator;
export type CreateIndicatorApiArg = PartialDeep<Indicator>;

export type UpdateIndicatorApiResponse = unknown;
export type UpdateIndicatorApiArg = Indicator; // Indicator

export type DeleteIndicatorApiResponse = unknown;
export type DeleteIndicatorApiArg = string; // Indicator id

export type IndicatorImageType = {
	id: string;
	url: string;
	type: string;
};

export type Indicator = {
	hei_name: string; // Name of the Higher Education Institution
	admissions_rate: string; // Admissions rate
	enrolment_rate: string; // Enrolment rate
	graduation_rate: string; // Graduation rate
	employment_rate: string; // Employment rate
	staff_count: string; // Total string of staff
	international_students: string; // Number of international students
	year: string; // Year of the data
	output_students: string; // Number of students outputted
	faculty_ratio: string; // Faculty to student ratio
	handle: string;
};

export const {
	useGetIndicatorsQuery,
	useDeleteIndicatorsMutation,
	useGetIndicatorQuery,
	useUpdateIndicatorMutation,
	useDeleteIndicatorMutation,
	useCreateIndicatorMutation
} = IndicatorsApi;

// export type ECommerceApiType = {
// 	[IndicatorsApi.reducerPath]: ReturnType<typeof IndicatorsApi.reducer>;
// };
