import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import InstitutionModel from './institution/models/InstitutionModel';


export const addTagTypes = ['institutions', 'institution', 'eCommerce_products', 'eCommerce_product', 'eCommerce_orders', 'eCommerce_order'] as const;

const InstitutionsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			GetInstitutions: build.query<GetInstitutionsApiResponse, GetInstitutionsApiArg>({
				query: () => ({ url: `/mock-api/institutions/schools` }),
				providesTags: ['institutions']
			}),
			GetInstitution: build.query<GetInstitutionApiResponse, GetInstitutionApiArg>({
				query: (institutionId) => ({
					url: `/mock-api/institutions/schools/${institutionId}`
				}),
				providesTags: ['institution', 'institutions']
			}),
			getECommerceProducts: build.query<GetECommerceProductsApiResponse, GetECommerceProductsApiArg>({
				query: () => ({ url: `/mock-api/ecommerce/products` }),
				providesTags: ['eCommerce_products']
			}),
			deleteECommerceProducts: build.mutation<DeleteECommerceProductsApiResponse, DeleteECommerceProductsApiArg>({
				query: (productIds) => ({
					url: `/mock-api/ecommerce/products`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['eCommerce_products']
			}),
			getECommerceProduct: build.query<GetECommerceProductApiResponse, GetECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`
				}),
				providesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			createECommerceProduct: build.mutation<CreateECommerceProductApiResponse, CreateECommerceProductApiArg>({
				query: (newProduct) => ({
					url: `/mock-api/ecommerce/products`,
					method: 'POST',
					data: InstitutionModel(newProduct)
				}),
				invalidatesTags: ['eCommerce_products', 'eCommerce_product']
			}),
			updateECommerceProduct: build.mutation<UpdateECommerceProductApiResponse, UpdateECommerceProductApiArg>({
				query: (product) => ({
					url: `/mock-api/ecommerce/products/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			deleteECommerceProduct: build.mutation<DeleteECommerceProductApiResponse, DeleteECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			getECommerceOrders: build.query<GetECommerceOrdersApiResponse, GetECommerceOrdersApiArg>({
				query: () => ({ url: `/mock-api/ecommerce/orders` }),
				providesTags: ['eCommerce_orders']
			}),
			getECommerceOrder: build.query<GetECommerceOrderApiResponse, GetECommerceOrderApiArg>({
				query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
				providesTags: ['eCommerce_order']
			}),
			updateECommerceOrder: build.mutation<UpdateECommerceOrderApiResponse, UpdateECommerceOrderApiArg>({
				query: (order) => ({
					url: `/mock-api/ecommerce/orders/${order.id}`,
					method: 'PUT',
					data: order
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrder: build.mutation<DeleteECommerceOrderApiResponse, DeleteECommerceOrderApiArg>({
				query: (orderId) => ({
					url: `/mock-api/ecommerce/orders/${orderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrders: build.mutation<DeleteECommerceOrdersApiResponse, DeleteECommerceOrdersApiArg>({
				query: (ordersId) => ({
					url: `/mock-api/ecommerce/orders`,
					method: 'DELETE',
					data: ordersId
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			})
		}),
		overrideExisting: false
	});

export default InstitutionsApi;

export type GetInstitutionsApiResponse = /** status 200 OK */ Institution[];
export type GetInstitutionsApiArg = void;

export type GetInstitutionApiResponse = /** status 200 OK */ Institution;
export type GetInstitutionApiArg = string;

export type GetECommerceProductsApiResponse = /** status 200 OK */ EcommerceProduct[];
export type GetECommerceProductsApiArg = void;

export type DeleteECommerceProductsApiResponse = unknown;
export type DeleteECommerceProductsApiArg = string[]; /** Product ids */

export type GetECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
export type GetECommerceProductApiArg = string;

export type CreateECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
export type CreateECommerceProductApiArg = PartialDeep<EcommerceProduct>;

export type UpdateECommerceProductApiResponse = unknown;
export type UpdateECommerceProductApiArg = EcommerceProduct; // Product

export type DeleteECommerceProductApiResponse = unknown;
export type DeleteECommerceProductApiArg = string; // Product id

export type GetECommerceOrdersApiResponse = /** status 200 OK */ EcommerceOrder[];
export type GetECommerceOrdersApiArg = void;

export type GetECommerceOrderApiResponse = /** status 200 OK */ EcommerceOrder;
export type GetECommerceOrderApiArg = string; // Order id

export type UpdateECommerceOrderApiResponse = unknown;
export type UpdateECommerceOrderApiArg = EcommerceOrder; // Order

export type DeleteECommerceOrderApiResponse = unknown;
export type DeleteECommerceOrderApiArg = string; // Order id

export type DeleteECommerceOrdersApiResponse = unknown;
export type DeleteECommerceOrdersApiArg = string[]; // Orders id

export type EcommerceProductImageType = {
	id: string;
	url: string;
	type: string;
};
export type InstitutionImageType = {
	id: string;
	url: string;
	type: string;
};
export type Institution = {
	id: string; // Unique identifier for each institution
	heiName: string; // Name of the institution
	institutionDesignation: "UNAM" | "NUST" | "IUM" | "BSE"; // Predefined institution designations
	typeOfInstitution: "Public" | "Private"; // Institution type: either public or private
	phone: string;
	email: string;
	address: string;
	yearOfEstablishment: number; // Year the institution was established
	numberOfStudents: number; // Total number of students in the institution
	location: string; // Physical location of the institution
	campuses: number; // Number of campuses the institution has
	website: string; // Official website of the institution
	accreditationStatus: "Accredited" | "Non-Accredited"; // Accreditation status
	keyProgramsOffered: string[]; // List of key programs offered by the institution
	images: InstitutionImageType[];
	featuredImageId: string;
	handle: string;
	active: boolean;
};

export type EcommerceProduct = {
	id: string;
	name: string;
	handle: string;
	description: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: EcommerceProductImageType[];
	priceTaxExcl: number;
	priceTaxIncl: number;
	taxRate: number;
	comparedPrice: number;
	quantity: number;
	sku: string;
	width: string;
	height: string;
	depth: string;
	weight: string;
	extraShippingFee: number;
	active: boolean;
};

export type EcommerceOrder = {
	id: string;
	reference: string;
	subtotal: string;
	tax: string;
	discount: string;
	total: string;
	date: string;
	customer: {
		id: string;
		firstName: string;
		lastName: string;
		avatar: string;
		company: string;
		jobTitle: string;
		email: string;
		phone: string;
		invoiceAddress: {
			address: string;
			lat: number;
			lng: number;
		};
		shippingAddress: {
			address: string;
			lat: number;
			lng: number;
		};
	};
	products: Partial<EcommerceProduct & { image: string; price: string }>[];
	status: {
		id: string;
		name: string;
		color: string;
		date?: string;
	}[];
	payment: {
		transactionId: string;
		amount: string;
		method: string;
		date: string;
	};
	shippingDetails: {
		tracking: string;
		carrier: string;
		weight: string;
		fee: string;
		date: string;
	}[];
};

export const {
	useGetInstitutionsQuery,
	useGetInstitutionQuery,
	useDeleteInstitutionMutation,
	useUpdateInstitutionMutation,
	useCreateInstitutionMutation,
	useDeleteECommerceProductsMutation,
	useGetECommerceProductQuery,
	useUpdateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useGetECommerceOrdersQuery,
	useGetECommerceOrderQuery,
	useUpdateECommerceOrderMutation,
	useDeleteECommerceOrderMutation,
	useDeleteECommerceOrdersMutation,
	useCreateECommerceProductMutation
} = InstitutionsApi;

export type ECommerceApiType = {
	[InstitutionsApi.reducerPath]: ReturnType<typeof InstitutionsApi.reducer>;
};
