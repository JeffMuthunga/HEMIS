import { apiService as api } from 'app/store/apiService'; // Ensure this path is correct
import { PartialDeep } from 'type-fest';
import ProductModel from './product/models/FacilitiesModel'; // Ensure this path is correct
import { S } from 'vite/dist/node/types.d-aGj9QkWt';

// Define the tag types to invalidate queries
export const addTagTypes = [
  'facilities_products',
  'facilities_product',
  'facilities_orders',
  'facilities_order',
] as const;

const facilitiesApi = api // Corrected typo
  .enhanceEndpoints({
    addTagTypes, // Adding tag types for cache invalidation
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFacilitiesProducts: build.query<GetFacilitiesProductsApiResponse, GetFacilitiesProductsApiArg>({
        query: () => ({
          url: `/mock-api/facilities/products`,
        }),
        providesTags: ['facilities_products'],
      }),

      deleteFacilitiesProducts: build.mutation<DeleteFacilitiesProductsApiResponse, DeleteFacilitiesProductsApiArg>({
        query: (productIds) => ({
          url: `/mock-api/facilities/products`,
          method: 'DELETE',
          body: productIds, // Use body to send productIds
        }),
        invalidatesTags: ['facilities_products'],
      }),

      getFacilitiesProduct: build.query<GetFacilitiesProductApiResponse, GetFacilitiesProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/facilities/products/${productId}`,
        }),
        providesTags: ['facilities_product', 'facilities_products'],
      }),

      createFacilitiesProduct: build.mutation<CreateFacilitiesProductApiResponse, CreateFacilitiesProductApiArg>({
        query: (newProduct) => ({
          url: `/mock-api/facilities/products`,
          method: 'POST',
          body: ProductModel(newProduct), // Assuming ProductModel transforms the input data
        }),
        invalidatesTags: ['facilities_products', 'facilities_product'],
      }),

      updateFacilitiesProduct: build.mutation<UpdateFacilitiesProductApiResponse, UpdateFacilitiesProductApiArg>({
        query: (product) => ({
          url: `/mock-api/facilities/products/${product.id}`,
          method: 'PUT',
          body: product,
        }),
        invalidatesTags: ['facilities_product', 'facilities_products'],
      }),

      deleteFacilitiesProduct: build.mutation<DeleteFacilitiesProductApiResponse, DeleteFacilitiesProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/facilities/products/${productId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['facilities_product', 'facilities_products'],
      }),

      getFacilitiesOrders: build.query<GetFacilitiesOrdersApiResponse, GetFacilitiesOrdersApiArg>({
        query: () => ({
          url: `/mock-api/facilities/orders`,
        }),
        providesTags: ['facilities_orders'],
      }),

      getFacilitiesOrder: build.query<GetFacilitiesOrderApiResponse, GetFacilitiesOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/facilities/orders/${orderId}`,
        }),
        providesTags: ['facilities_order'],
      }),

      updateFacilitiesOrder: build.mutation<UpdateFacilitiesOrderApiResponse, UpdateFacilitiesOrderApiArg>({
        query: (order) => ({
          url: `/mock-api/facilities/orders/${order.id}`,
          method: 'PUT',
          body: order,
        }),
        invalidatesTags: ['facilities_order', 'facilities_orders'],
      }),

      deleteFacilitiesOrder: build.mutation<DeleteFacilitiesOrderApiResponse, DeleteFacilitiesOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/facilities/orders/${orderId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['facilities_order', 'facilities_orders'],
      }),

      deleteFacilitiesOrders: build.mutation<DeleteFacilitiesOrdersApiResponse, DeleteFacilitiesOrdersApiArg>({
        query: (ordersId) => ({
          url: `/mock-api/facilities/orders`,
          method: 'DELETE',
          body: ordersId,
        }),
        invalidatesTags: ['facilities_order', 'facilities_orders'],
      }),
    }),
    overrideExisting: false,
  });

export default facilitiesApi;

// Types for API responses and requests
export type GetFacilitiesProductsApiResponse = FacilitiesProduct[]; // List of products
export type GetFacilitiesProductsApiArg = void;

export type DeleteFacilitiesProductsApiResponse = unknown;
export type DeleteFacilitiesProductsApiArg = string[]; // Product IDs to delete

export type GetFacilitiesProductApiResponse = FacilitiesProduct; // Single product details
export type GetFacilitiesProductApiArg = string; // Product ID

export type CreateFacilitiesProductApiResponse = FacilitiesProduct; // Product after creation
export type CreateFacilitiesProductApiArg = PartialDeep<FacilitiesProduct>;

export type UpdateFacilitiesProductApiResponse = unknown;
export type UpdateFacilitiesProductApiArg = FacilitiesProduct; // Updated product

export type DeleteFacilitiesProductApiResponse = unknown;
export type DeleteFacilitiesProductApiArg = string; // Product ID to delete

export type GetFacilitiesOrdersApiResponse = FacilitiesOrder[]; // List of orders
export type GetFacilitiesOrdersApiArg = void;

export type GetFacilitiesOrderApiResponse = FacilitiesOrder; // Single order details
export type GetFacilitiesOrderApiArg = string; // Order ID

export type UpdateFacilitiesOrderApiResponse = unknown;
export type UpdateFacilitiesOrderApiArg = FacilitiesOrder; // Updated order

export type DeleteFacilitiesOrderApiResponse = unknown;
export type DeleteFacilitiesOrderApiArg = string; // Order ID to delete

export type DeleteFacilitiesOrdersApiResponse = unknown;
export type DeleteFacilitiesOrdersApiArg = string[]; // Orders IDs to delete

// Facilities Product and Order Types
export type FacilitiesProduct = {
  id: string;
  academicYear: string;
  featuredImageId:string;
  images:[];
  handle:string;
  active:boolean;
  HEIName: string;
  HEICode: string;
  campusName: string;
  buildingName: string;
  roomNumber: string;
  spaceIdentifier: string;
  condition: string;
  assignableArea: number; // Adjust type as necessary
  usageType: string;
  occupancyCapacity: number; // Adjust type as necessary
};

export type FacilitiesOrder = {
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
  products: Partial<FacilitiesProduct & { image: string; price: string }>[]; // Adjust as necessary
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

// Exporting hooks for consuming endpoints
export const {
  useGetFacilitiesProductsQuery,
  useDeleteFacilitiesProductsMutation,
  useGetFacilitiesProductQuery,
  useUpdateFacilitiesProductMutation,
  useDeleteFacilitiesProductMutation,
  useGetFacilitiesOrdersQuery,
  useGetFacilitiesOrderQuery,
  useUpdateFacilitiesOrderMutation,
  useDeleteFacilitiesOrderMutation,
  useDeleteFacilitiesOrdersMutation,
  useCreateFacilitiesProductMutation,
} = facilitiesApi;

export type facilitiesApiType = {
  [facilitiesApi.reducerPath]: ReturnType<typeof facilitiesApi.reducer>;
};
