import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { Navigate } from 'react-router-dom';
import WorkflowForm from './tabs/home/WorkflowForm';

// Fixing the component name here
const WorkflowDashboardApp = lazy(() => import('./WorkflowDashboardApp'));

/**
 * Project Dashboard App Route
 */
const WorkflowDashboardAppRoute: FuseRouteItemType = {
	path: 'dashboards/workflow-mgt',
	element: <WorkflowDashboardApp />,
	children: [
		{
			path: '',
			element: <Navigate to="new" />
		},
		{
			path: 'new',
			element: <WorkflowForm initialValues={{ name: 'Example Workflow', description: 'This is a test description.', status: 'active' }} />
		}
	]
};

export default WorkflowDashboardAppRoute;
