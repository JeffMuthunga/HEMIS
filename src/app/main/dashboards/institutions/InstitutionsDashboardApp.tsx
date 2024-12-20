import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import InstitutionsDashboardAppHeader from './InstitutionsDashboardAppHeader';
import VisitorsOverviewWidget from '../analytics/widgets/VisitorsOverviewWidget';
import ConversionsWidget from '../analytics/widgets/ConversionsWidget';
import ImpressionsWidget from '../analytics/widgets/ImpressionsWidget';
import VisitsWidget from '../analytics/widgets/VisitsWidget';
import VisitorsVsPageViewsWidget from '../analytics/widgets/VisitorsVsPageViewsWidget';
import NewVsReturningWidget from '../analytics/widgets/NewVsReturningWidget';
import GenderWidget from '../analytics/widgets/GenderWidget';
import AgeWidget from '../analytics/widgets/AgeWidget';
import LanguageWidget from '../analytics/widgets/LanguageWidget';
import Institutions from './institutions_tables/Institutions';


/**
 * The Institutions Dashboard app.
 */

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};
function InstitutionsDashboardApp() {
	return (
		<FusePageSimple
			header={<InstitutionsDashboardAppHeader />}
			content={
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<Institutions/>
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<ConversionsWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<ImpressionsWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-1 "
					>
						<VisitsWidget />
					</motion.div>

					<motion.div
						variants={item}
						className="sm:col-span-2 lg:col-span-3"
					>
						<VisitorsVsPageViewsWidget />
					</motion.div>

					<div className="w-full mt-16 sm:col-span-3">
						<Typography className="text-2xl font-semibold tracking-tight leading-6">
							Your Audience
						</Typography>
						<Typography
							className="font-medium tracking-tight"
							color="text.secondary"
						>
							Demographic properties of your users
						</Typography>
					</div>

					<div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
						<motion.div variants={item}>
							<NewVsReturningWidget />
						</motion.div>
						<motion.div variants={item}>
							<GenderWidget />
						</motion.div>
						<motion.div variants={item}>
							<AgeWidget />
						</motion.div>
						<motion.div variants={item}>
							<LanguageWidget />
						</motion.div>
					</div>
				</motion.div>
			}
		/>
	);
}

export default InstitutionsDashboardApp;
