import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const AccreditationsApp = lazy(() => import('./AccreditationsApp'));
const Accreditation = lazy(() => import('./accreditation/Accreditation'));
const Accreditations = lazy(() => import('./accreditations/Accreditations'));


/**
 * The E-Commerce app Routes.
 */
const AccreditationsAppRoute: FuseRouteItemType = {
	path: 'dashboards/programmes-accreditations',
	element: <AccreditationsApp />,
	children: [
		{
			path: '',
			element: <Navigate to="accreditations" />
		},
		{
			path: 'accreditations',
			children: [
				{
					path: '',
					element: <Accreditations />
				},
				{
					path: ':accreditationId/:handle?',
					element: <Accreditation />
				},
				{
					path: 'new',
					element: <Accreditation/>
				}
			]
		},
	]
};

export default AccreditationsAppRoute;
