import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const FacilitiesApp = lazy(() => import('./FacilitiesApp'));
const Product = lazy(() => import('./product/Facilities'));
const Products = lazy(() => import('./products/Facilities'));

/**
 * The Facilities app Routes.
 */
const facilitiesAppRoute: FuseRouteItemType = {
  // Change base path to match navigation
  path: 'dashboards/facilities',
  element: <FacilitiesApp />,
  children: [
    {
      path: '',
      element: <Navigate to="facilities" />
    },
    {
      path: 'facilities',
      element: <Products />
    },
    {
      path: 'product/:productId',  
      element: <Product />
    }
  ]
};

export default facilitiesAppRoute;