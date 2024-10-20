import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const IndicatorsApp = lazy(() => import('./IndicatorsApp'));
const Indicator = lazy(() => import('./indicator/Indicator'));
const Indicators = lazy(() => import('./indicators/Indicators'));


/**
 * The E-Commerce app Routes.
 */
const IndicatorsAppRoute: FuseRouteItemType = {
	path: 'dashboards/programmes',
	element: <IndicatorsApp />,
	children: [
		{
			path: '',
			element: <Navigate to="indicators" />
		},
		{
			path: 'indicators',
			children: [
				{
					path: '',
					element: <Indicators />
				},
				{
					path: ':indicatorId/:handle?',
					element: <Indicator />
				},
				{
					path: 'new',
					element: <Indicator/>
				}
			]
		},
	]
};

export default IndicatorsAppRoute;
