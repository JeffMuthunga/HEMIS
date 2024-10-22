import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import Application from './application/Application';
import BatchManagement from './stages/BatchManagement';
import PaymentVerificationUI from './stages/PaymentVerificationUI';
import DocumentVerificationStage from './stages/DocumentVerificationStage';
import TechnicalReviewStage from './stages/TechnicalReviewStage';
import FinancialEvaluationStage from './stages/FinancialEvaluationStage';
import NotificationToApplicantStage from './stages/NotificationToApplicantStage';
import NCHEReportConsolidation from './stages/NCHEReportConsolidation';
import NCHEBatchManagement from './stages/NCHEBatchManagement';


const ApplicationsDashboardApp = lazy(() => import('./ApplicationsDashboardApp'));
// const PaymentVerificationForm = lazy(() => import('./stages/PaymentVerificationForm'));

const ApplicationsDashboardAppRoute: FuseRouteItemType = {
	path: 'dashboards/applications',
	children: [
		{
			path: '',
			element: <ApplicationsDashboardApp />
		},
		// {
		// 	path: 'batch_mgt',
		// 	element: <BatchManagement heiName="University of Namibia" currentUser="Hemis Admin"/>
		// },
		{
			path: 'batch_mgt',
			element: <NCHEBatchManagement />
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
			path: 'document_verification',
			element: <DocumentVerificationStage />
		},
		{
			path: 'technical_review',
			element: <TechnicalReviewStage />

		},
		{
			path: 'financial_evaluation',
			element: <FinancialEvaluationStage />
		},
		{
			path: 'notification_to_applicant',
			element: <NotificationToApplicantStage />
		},
		{
			path: 'report_consolidation',
			element: <NCHEReportConsolidation />
		}
	]
};

export default ApplicationsDashboardAppRoute;
