import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const VisualizationApp = lazy(() => import('./VisualisationApp'));
const Course = lazy(() => import('./statistics/page'));
// const Courses = lazy(() => import('./courses/Courses'));

/**
 * The Statistics app routes.
 */
const StatisticsAppConfig: FuseRouteItemType = {
	path: 'apps/visualization',
	element: <VisualizationApp />,
	children: [
		{
			path: '',
			element: <Navigate to="/apps/visualization/statistics" />
		},
		{
			path: 'statistics',
			element: <Course />
		}
		// {
		// 	path: 'courses',
		// 	element: <Courses />
		// }
	]
};

export default StatisticsAppConfig;
