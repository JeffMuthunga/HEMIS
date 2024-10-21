import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const StudentsApp = lazy(() => import('./StudentsApp'));
const Student = lazy(() => import('./student/Student'));
const Students = lazy(() => import('./students/Students'));


/**
 * The E-Commerce app Routes.
 */
const StudentsAppRoute: FuseRouteItemType = {
	path: 'dashboards/students',
	children: [
		{
			path: '',
			element: <StudentsApp />,
			children: [
				{
					path: '',
					element: <Students />
				},
				{
					path: ':studentId/:handle?',
					element: <Student />
				},
				{
					path: 'new',
					element: <Student/>
				}
			]
		},
		// {
		// 	path: 'new',
		// 	element: <Student />
		// },
		// {
		// 	path: 'students',
		// 	children: [
		// 		{
		// 			path: '',
		// 			element: <Students />
		// 		},
		// 		{
		// 			path: ':studentId/:handle?',
		// 			element: <Student />
		// 		},
		// 		{
		// 			path: 'new',
		// 			element: <Student/>
		// 		}
		// 	]
		// }
	]
};

export default StudentsAppRoute;
