import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import StudentModel from './student/models/StudentModel';

export const addTagTypes = ['students', 'student'] as const;

const StudentsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getStudents: build.query<GetStudentsApiResponse, GetStudentsApiArg>({
				query: () => ({ url: `/mock-api/students/all` }),
				providesTags: ['students']
			}),
			deleteStudents: build.mutation<DeleteStudentsApiResponse, DeleteStudentsApiArg>({
				query: (productIds) => ({
					url: `/mock-api/students/deleteStudent`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['students']
			}),
			getStudent: build.query<GetStudentApiResponse, GetStudentApiArg>({
				query: (studentId) => ({
					url: `/mock-api/students/all/${studentId}`
				}),
				providesTags: ['student', 'students']
			}),
			createStudent: build.mutation<CreateStudentApiResponse, CreateStudentApiArg>({
				query: (newStudent) => ({
					url: `/mock-api/students/addStudent`,
					method: 'POST',
					data: StudentModel(newStudent)
				}),
				invalidatesTags: ['students', 'student']
			}),
			updateStudent: build.mutation<UpdateStudentApiResponse, UpdateStudentApiArg>({
				query: (student) => ({
					url: `/mock-api/students/all/${student.id}`,
					method: 'PUT',
					data: student
				}),
				invalidatesTags: ['student', 'students']
			}),
			deleteStudent: build.mutation<DeleteStudentApiResponse, DeleteStudentApiArg>({
				query: (studentId) => ({
					url: `/mock-api/students/all/${studentId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['student', 'students']
			})
		}),
		overrideExisting: false
	});

export default StudentsApi;

export type GetStudentsApiResponse = /** status 200 OK */ Student[];
export type GetStudentsApiArg = void;

export type DeleteStudentsApiResponse = unknown;
export type DeleteStudentsApiArg = string[]; /** Student ids */

export type GetStudentApiResponse = /** status 200 OK */ Student;
export type GetStudentApiArg = string;

export type CreateStudentApiResponse = /** status 200 OK */ Student;
export type CreateStudentApiArg = PartialDeep<Student>;

export type UpdateStudentApiResponse = unknown;
export type UpdateStudentApiArg = Student; // Student

export type DeleteStudentApiResponse = unknown;
export type DeleteStudentApiArg = string; // Student id

export type StudentImageType = {
	id: string;
	url: string;
	type: string;
};

export type Student = {
	id: string;
	handle: string;
	academicYear: string;
	studentIdentifier: string;
	name: string;
	surname: string;
	dateOfBirth: string;
	sex: 'Male' | 'Female' | 'Other';
	email: string;
	mobileNo: string;
	qualificationCode: string;
	faculty: string;
	department: string;
	marginalized: 'Yes' | 'No';
	disability: 'None' | 'Visual Impairment' | 'Other';
	sourceOfFunding: 'Scholarship' | 'Self-funded' | 'Loan';
	examinationGrade: string;
	active: boolean;
	featuredImageId: string;
	images: StudentImageType[];
};

export const {
	useGetStudentsQuery,
	useDeleteStudentsMutation,
	useGetStudentQuery,
	useUpdateStudentMutation,
	useDeleteStudentMutation,
	useCreateStudentMutation
} = StudentsApi;

export type ECommerceApiType = {
	[StudentsApi.reducerPath]: ReturnType<typeof StudentsApi.reducer>;
};
