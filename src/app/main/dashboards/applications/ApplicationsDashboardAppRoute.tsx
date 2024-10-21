import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import Application from './application/Application';
import BatchManagement from './stages/BatchManagement';
import PaymentVerificationUI from './stages/PaymentVerificationUI';
// import PaymentVerificationForm from './stages/PaymentVerificationForm';


const ApplicationsDashboardApp = lazy(() => import('./ApplicationsDashboardApp'));
// const PaymentVerificationForm = lazy(() => import('./stages/PaymentVerificationForm'));

const ApplicationsDashboardAppRoute: FuseRouteItemType = {
	path: 'dashboards/applications',
	children: [
		{
			path: '',
			element: <ApplicationsDashboardApp />
		},
		{
			path: 'batch_mgt',
			element: <BatchManagement heiName="University of Namibia" currentUser="Hemis Admin"/>
		},
		{
			path: 'receiving',
			element: <Application />
		},
		{
			path: 'payment_verification',
			element: <PaymentVerificationUI />
		},
		{
			path: 'document_verification'
		},
		{
			path: 'technical_review'
		},
		{
			path: 'financial_evaluation'
		},
		{
			path: 'notification_to_applicant'
		}
	]
};

export default ApplicationsDashboardAppRoute;
