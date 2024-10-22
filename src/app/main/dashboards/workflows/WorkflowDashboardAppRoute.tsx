import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { Navigate } from 'react-router-dom';
import WorkflowForm from './tabs/home/WorkflowForm';
import HEIRegistrationWorkflow from './HEIRegistrationWorkflow';

// Fixing the component name here
const WorkflowDashboardApp = lazy(() => import('./WorkflowDashboardApp'));

/**
 * Project Dashboard App Route
 */
const WorkflowDashboardAppRoute: FuseRouteItemType = {
	path: 'dashboards/workflow-mgt',
	children: [
		{
			path: '',
			element: <WorkflowDashboardApp />
		},
		{
			path: 'hei-registration-workflows',
			element: <HEIRegistrationWorkflow />
		},
		{
			path: 'new',
			element: <WorkflowForm initialValues={{ name: 'Example Workflow', description: 'This is a test description.', status: 'active' }} />
		},
		{
			path: ':wid/edit',
			element: <WorkflowForm initialValues={{ name: 'Example Workflow', description: 'This is a test description.', status: 'active' }} />
		},
		{
			path: ':wid/view',
			element: <WorkflowForm initialValues={{ name: 'Example Workflow', description: 'This is a test description.', status: 'active' }} />
		}
	]
};

export default WorkflowDashboardAppRoute;
