import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import StaffModel from './product/models/StaffModel';

// Updated StaffProduct type to match the StaffModel structure
export type StaffProduct = {
  id: string;
  academicYear: string;
  PersonelId: string;
  StaffName: string;
  Surname: string;
  Sex: string;
  DateOfBirth: string;
  ContactInformation: string;
  TermsOfEmployment: string;
  ModeOfEmployment: number;
  DateOfEmployment: string;
  Department: number;
  featuredImageId: string;
  Qualification: string;
  images: [];
  AcademicEmploymentFunction: string;
  active: boolean;
};

export const addTagTypes = [
  'staff_products',
  'staff_product',
  'staff_orders',
  'staff_order',
] as const;

const staffApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getStaffProducts: build.query<GetStaffProductsApiResponse, GetStaffProductsApiArg>({
        query: () => ({
          url: `/mock-api/staff/products`,
        }),
        providesTags: ['staff_products'],
      }),

      deleteStaffProducts: build.mutation<DeleteStaffProductsApiResponse, DeleteStaffProductsApiArg>({
        query: (productIds) => ({
          url: `/mock-api/staff/products`,
          method: 'DELETE',
          body: productIds,
        }),
        invalidatesTags: ['staff_products'],
      }),

      getStaffProduct: build.query<GetStaffProductApiResponse, GetStaffProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/staff/products/${productId}`,
        }),
        providesTags: ['staff_product', 'staff_products'],
      }),

      createStaffProduct: build.mutation<CreateStaffProductApiResponse, CreateStaffProductApiArg>({
        query: (newProduct) => ({
          url: `/mock-api/staff/products`,
          method: 'POST',
          body: StaffModel(newProduct),
        }),
        invalidatesTags: ['staff_products', 'staff_product'],
      }),

      updateStaffProduct: build.mutation<UpdateStaffProductApiResponse, UpdateStaffProductApiArg>({
        query: (product) => ({
          url: `/mock-api/staff/products/${product.id}`,
          method: 'PUT',
          body: product,
        }),
        invalidatesTags: ['staff_product', 'staff_products'],
      }),

      deleteStaffProduct: build.mutation<DeleteStaffProductApiResponse, DeleteStaffProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/staff/products/${productId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['staff_product', 'staff_products'],
      }),

      getStaffOrders: build.query<GetStaffOrdersApiResponse, GetStaffOrdersApiArg>({
        query: () => ({
          url: `/mock-api/staff/orders`,
        }),
        providesTags: ['staff_orders'],
      }),

      getStaffOrder: build.query<GetStaffOrderApiResponse, GetStaffOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/staff/orders/${orderId}`,
        }),
        providesTags: ['staff_order'],
      }),

      updateStaffOrder: build.mutation<UpdateStaffOrderApiResponse, UpdateStaffOrderApiArg>({
        query: (order) => ({
          url: `/mock-api/staff/orders/${order.id}`,
          method: 'PUT',
          body: order,
        }),
        invalidatesTags: ['staff_order', 'staff_orders'],
      }),

      deleteStaffOrder: build.mutation<DeleteStaffOrderApiResponse, DeleteStaffOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/staff/orders/${orderId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['staff_order', 'staff_orders'],
      }),

      deleteStaffOrders: build.mutation<DeleteStaffOrdersApiResponse, DeleteStaffOrdersApiArg>({
        query: (ordersId) => ({
          url: `/mock-api/staff/orders`,
          method: 'DELETE',
          body: ordersId,
        }),
        invalidatesTags: ['staff_order', 'staff_orders'],
      }),
    }),
    overrideExisting: false,
  });

export default staffApi;

// Types for API responses and requests
export type GetStaffProductsApiResponse = StaffProduct[];
export type GetStaffProductsApiArg = void;

export type DeleteStaffProductsApiResponse = unknown;
export type DeleteStaffProductsApiArg = string[];

export type GetStaffProductApiResponse = StaffProduct;
export type GetStaffProductApiArg = string;

export type CreateStaffProductApiResponse = StaffProduct;
export type CreateStaffProductApiArg = PartialDeep<StaffProduct>;

export type UpdateStaffProductApiResponse = unknown;
export type UpdateStaffProductApiArg = StaffProduct;

export type DeleteStaffProductApiResponse = unknown;
export type DeleteStaffProductApiArg = string;

export type GetStaffOrdersApiResponse = StaffOrder[];
export type GetStaffOrdersApiArg = void;

export type GetStaffOrderApiResponse = StaffOrder;
export type GetStaffOrderApiArg = string;

export type UpdateStaffOrderApiResponse = unknown;
export type UpdateStaffOrderApiArg = StaffOrder;

export type DeleteStaffOrderApiResponse = unknown;
export type DeleteStaffOrderApiArg = string;

export type DeleteStaffOrdersApiResponse = unknown;
export type DeleteStaffOrdersApiArg = string[];

// Staff Order Type (keeping this as is since it's a separate entity)
export type StaffOrder = {
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
  products: Partial<StaffProduct & { image: string; price: string }>[];
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
  useGetStaffProductsQuery,
  useDeleteStaffProductsMutation,
  useGetStaffProductQuery,
  useUpdateStaffProductMutation,
  useDeleteStaffProductMutation,
  useGetStaffOrdersQuery,
  useGetStaffOrderQuery,
  useUpdateStaffOrderMutation,
  useDeleteStaffOrderMutation,
  useDeleteStaffOrdersMutation,
  useCreateStaffProductMutation,
} = staffApi;

export type staffApiType = {
  [staffApi.reducerPath]: ReturnType<typeof staffApi.reducer>;
};