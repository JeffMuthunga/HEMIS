import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import WorkflowsTable from './WorkflowsTable';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';

/**
 * The HomeTab component.
 */
function WorkflowsTab() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const navigate  = useNavigate();

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<div className="mt-8">
			<div className="flex items-center justify-end mt-24 sm:mt-0 sm:mx-8 space-x-8 mb-8">
				<Button
					className="whitespace-nowrap"
					startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus-circle</FuseSvgIcon>}
					variant="contained"
					color="primary"
					onClick={() => navigate('/dashboards/workflow-mgt/new')}
				>
					Add Workflow
				</Button>
			</div>
			<WorkflowsTable />
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<motion.div variants={item}>
					<SummaryWidget />
				</motion.div>
				<motion.div variants={item}>
					<OverdueWidget />
				</motion.div>
				<motion.div variants={item}>
					<IssuesWidget />
				</motion.div>
				<motion.div variants={item}>
					<FeaturesWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4"
				>
					<GithubIssuesWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4 lg:col-span-2"
				>
					<TaskDistributionWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4 lg:col-span-2"
				>
					<ScheduleWidget />
				</motion.div>
			</motion.div>
		</div>
	);
}

export default WorkflowsTab;
