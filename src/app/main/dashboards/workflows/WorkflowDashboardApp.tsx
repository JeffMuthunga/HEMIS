import FusePageSimple from '@fuse/core/FusePageSimple';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import WorkflowDashboardAppHeader from './WorkflowDashboardAppHeader';
import WorkflowsTab from './tabs/home/WorkflowsTab';
import TeamTab from './tabs/team/TeamTab';
import { useGetProjectDashboardWidgetsQuery } from './WorkflowDashboardApi';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 -1px 0 0px  ${theme.palette.divider}`
	}
}));

/**
 * The ProjectDashboardApp page.
 */
function WorkflowDashboardApp() {
	const { isLoading } = useGetProjectDashboardWidgetsQuery();

	const [tabValue, setTabValue] = useState('home');

	function handleTabChange(event: React.SyntheticEvent, value: string) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={<WorkflowDashboardAppHeader />}
			content={
				<div className="w-full pt-16 sm:pt-24">
					<div className="w-full px-24">
						<FuseTabs
							value={tabValue}
							onChange={handleTabChange}
							aria-label="New user tabs"
						>
							<FuseTab
								value="workflows"
								label="Workflows"
							/>
							<FuseTab
								value="processes"
								label="Processes"
							/>
						</FuseTabs>
					</div>
					{tabValue === 'workflows' && <WorkflowsTab />}
					{tabValue === 'processes' && <TeamTab />}
					<WorkflowsTab/>
				</div>
			}
		/>
	);
}

export default WorkflowDashboardApp;
