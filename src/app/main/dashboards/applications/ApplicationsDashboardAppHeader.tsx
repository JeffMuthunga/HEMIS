import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';

/**
 * The analytics dashboard app header.
 */
function ApplicationsDashboardAppHeader() {
	return (
		<div className="flex w-full container">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
				<div className="flex flex-col flex-auto">
					<PageBreadcrumb className="mb-8" />
					<Typography className="text-3xl font-semibold tracking-tight leading-8">
						HEI Private Institution Registration Application dashboard
					</Typography>
					<Typography
						className="font-medium tracking-tight"
						color="text.secondary"
					>
						Monitor institutions operating within the country, check reports and review performance of these institutions
					</Typography>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-8">
					<Button
						className="whitespace-nowrap"
						startIcon={<FuseSvgIcon size={20}>heroicons-outline:chart-bar-square</FuseSvgIcon>}
						variant="contained"
						color="primary"
					>
						See Dashboards
					</Button>
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-up-tray</FuseSvgIcon>}
					>
						Export Reports
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ApplicationsDashboardAppHeader;
