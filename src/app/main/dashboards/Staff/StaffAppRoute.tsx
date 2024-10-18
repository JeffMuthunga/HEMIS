import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const StaffApp = lazy(() => import('./StaffApp'));
const Product = lazy(() => import('./product/Staff'));
const Products = lazy(() => import('./products/Staff'));

/**
 * The Staff app Routes.
 */
const staffAppRoute: FuseRouteItemType = {
  // Change base path to match navigation
  path: 'dashboards/staff',
  element: <StaffApp />,
  children: [
    {
      path: '',
      element: <Navigate to="staff" />
    },
    {
      path: 'staff',
      element: <Products />
    },
    {
      path: 'product/:productId',  
      element: <Product />
    }
  ]
};

export default staffAppRoute;