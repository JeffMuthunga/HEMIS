import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import Institution from './institution/Institution';

const InstitutionsDashboardApp = lazy(() => import('./InstitutionsDashboardApp'));
// const Product = lazy(() => import('./product/Product'));
// const Products = lazy(() => import('./products/Products'));
// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));

/**
 * The E-Commerce app Routes.
 */
const InstitutionsDashboardAppRoute: FuseRouteItemType = {
	path: 'dashboards/institutions',
	children: [
		{
			path: '',
			element: <InstitutionsDashboardApp />
		},
		{
			path: 'new',
			element: <Institution />
		}
	]
};

export default InstitutionsDashboardAppRoute;
