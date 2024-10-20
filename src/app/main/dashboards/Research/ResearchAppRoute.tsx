import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const ResarchApp = lazy(() => import('./ResearchApp'));
const Product = lazy(() => import('./product/Research'));
const Products = lazy(() => import('./products/Research'));

/**
 * The Resarch app Routes.
 */
const resarchAppRoute: FuseRouteItemType = {
  // Change base path to match navigation
  path: 'dashboards/research',
  element: <ResarchApp />,
  children: [
    {
      path: '',
      element: <Navigate to="research" />
    },
    {
      path: 'research',
      element: <Products />
    },
    {
      path: 'product/:productId',  
      element: <Product />
    }
  ]
};

export default resarchAppRoute;