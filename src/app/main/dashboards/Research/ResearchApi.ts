import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import ResearchModel from './product/models/ResearchModel';

export type ResearchProduct = {
  id: string;
  researchTitle: string;
  typeOfResearchOutcome: string;
  namesOfResearchers: string;
  areasfResearch: string;
  academicYear: string;
  heiDetails: string;
  publicationDate: string;
  journalConferenceDate: string;
  volumeIssue: number;
  pages: string;
  DOI: string;
  featuredImageId: string;
  fundingScore: string;
  images: [];
  abstract: string;
  active: boolean;
};

export type ResearchOrder = {
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
  products: Partial<ResearchProduct & { image: string; price: string }>[];
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

// API Response and Request Types
export type GetResearchProductsApiResponse = ResearchProduct[];
export type GetResearchProductsApiArg = void;

export type DeleteResearchProductsApiResponse = unknown;
export type DeleteResearchProductsApiArg = string[];

export type GetResearchProductApiResponse = ResearchProduct;
export type GetResearchProductApiArg = string;

export type CreateResearchProductApiResponse = ResearchProduct;
export type CreateResearchProductApiArg = PartialDeep<ResearchProduct>;

export type UpdateResearchProductApiResponse = unknown;
export type UpdateResearchProductApiArg = ResearchProduct;

export type DeleteResearchProductApiResponse = unknown;
export type DeleteResearchProductApiArg = string;

export type GetResearchOrdersApiResponse = ResearchOrder[];
export type GetResearchOrdersApiArg = void;

export type GetResearchOrderApiResponse = ResearchOrder;
export type GetResearchOrderApiArg = string;

export type UpdateResearchOrderApiResponse = unknown;
export type UpdateResearchOrderApiArg = ResearchOrder;

export type DeleteResearchOrderApiResponse = unknown;
export type DeleteResearchOrderApiArg = string;

export type DeleteResearchOrdersApiResponse = unknown;
export type DeleteResearchOrdersApiArg = string[];

export const addTagTypes = [
  'research_products',
  'research_product',
  'research_orders',
  'research_order',
] as const;

const researchApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getResearchProducts: build.query<GetResearchProductsApiResponse, GetResearchProductsApiArg>({
        query: () => ({
          url: `/mock-api/research/products`,
        }),
        providesTags: ['research_products'],
      }),

      // This mutation had the spelling error in its hook export (was 'Resarch' instead of 'Research')
      deleteResearchProducts: build.mutation<DeleteResearchProductsApiResponse, DeleteResearchProductsApiArg>({
        query: (productIds) => ({
          url: `/mock-api/research/products`,
          method: 'DELETE',
          body: productIds,
        }),
        invalidatesTags: ['research_products'],
      }),

      getResearchProduct: build.query<GetResearchProductApiResponse, GetResearchProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/research/products/${productId}`,
        }),
        providesTags: ['research_product', 'research_products'],
      }),

      createResearchProduct: build.mutation<CreateResearchProductApiResponse, CreateResearchProductApiArg>({
        query: (newProduct) => ({
          url: `/mock-api/research/products`,
          method: 'POST',
          body: ResearchModel(newProduct),
        }),
        invalidatesTags: ['research_products', 'research_product'],
      }),

      updateResearchProduct: build.mutation<UpdateResearchProductApiResponse, UpdateResearchProductApiArg>({
        query: (product) => ({
          url: `/mock-api/research/products/${product.id}`,
          method: 'PUT',
          body: product,
        }),
        invalidatesTags: ['research_product', 'research_products'],
      }),

      deleteResearchProduct: build.mutation<DeleteResearchProductApiResponse, DeleteResearchProductApiArg>({
        query: (productId) => ({
          url: `/mock-api/research/products/${productId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['research_product', 'research_products'],
      }),

      getResearchOrders: build.query<GetResearchOrdersApiResponse, GetResearchOrdersApiArg>({
        query: () => ({
          url: `/mock-api/research/orders`,
        }),
        providesTags: ['research_orders'],
      }),

      getResearchOrder: build.query<GetResearchOrderApiResponse, GetResearchOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/research/orders/${orderId}`,
        }),
        providesTags: ['research_order'],
      }),

      updateResearchOrder: build.mutation<UpdateResearchOrderApiResponse, UpdateResearchOrderApiArg>({
        query: (order) => ({
          url: `/mock-api/research/orders/${order.id}`,
          method: 'PUT',
          body: order,
        }),
        invalidatesTags: ['research_order', 'research_orders'],
      }),

      deleteResearchOrder: build.mutation<DeleteResearchOrderApiResponse, DeleteResearchOrderApiArg>({
        query: (orderId) => ({
          url: `/mock-api/research/orders/${orderId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['research_order', 'research_orders'],
      }),

      deleteResearchOrders: build.mutation<DeleteResearchOrdersApiResponse, DeleteResearchOrdersApiArg>({
        query: (ordersId) => ({
          url: `/mock-api/research/orders`,
          method: 'DELETE',
          body: ordersId,
        }),
        invalidatesTags: ['research_order', 'research_orders'],
      }),
    }),
    overrideExisting: false,
  });

// Export hooks - The error was here, with a typo in useDeleteResarchProductsMutation (missing 'e')
export const {
  useGetResearchProductsQuery,
  useDeleteResearchProductsMutation,  // This was previously misspelled as 'useDeleteResarchProductsMutation'
  useGetResearchProductQuery,
  useCreateResearchProductMutation,
  useUpdateResearchProductMutation,
  useDeleteResearchProductMutation,
  useGetResearchOrdersQuery,
  useGetResearchOrderQuery,
  useUpdateResearchOrderMutation,
  useDeleteResearchOrderMutation,
  useDeleteResearchOrdersMutation,
} = researchApi;

export type ResearchApiType = {
  [researchApi.reducerPath]: ReturnType<typeof researchApi.reducer>;
};

export default researchApi;