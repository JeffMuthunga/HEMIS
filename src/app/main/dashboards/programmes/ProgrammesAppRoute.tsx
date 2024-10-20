import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const ProgrammesApp = lazy(() => import('./ProgrammesApp'));
const Programme = lazy(() => import('./programme/Programme'));
const Programmes = lazy(() => import('./programmes/Programmes'));


/**
 * The E-Commerce app Routes.
 */
const ProgrammesAppRoute: FuseRouteItemType = {
	path: 'dashboards/accreditation-programmes',
	element: <ProgrammesApp />,
	children: [
		{
			path: '',
			element: <Navigate to="programmes" />
		},
		{
			path: 'programmes',
			children: [
				{
					path: '',
					element: <Programmes />
				},
				{
					path: ':programmeId/:handle?',
					element: <Programme />
				},
				{
					path: 'new',
					element: <Programme/>
				}
			]
		},
	]
};

export default ProgrammesAppRoute;
