import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import GithubIssuesDataType from './types/GithubIssuesDataType';
import { useGetProjectDashboardWidgetsQuery } from '../../../WorkflowDashboardApi';

/**
 * The GithubIssuesWidget widget.
 */
function GithubIssuesWidget() {
	const theme = useTheme();
	const [awaitRender, setAwaitRender] = useState(true);
	const [tabValue, setTabValue] = useState(0);

	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.githubIssues as GithubIssuesDataType;

	if (!widget) {
		return null;
	}

	const { overview, series, ranges, labels } = widget;

	const currentRange = Object.keys(ranges)[tabValue];

	const chartOptions: ApexOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'line',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		colors: [theme.palette.primary.main, theme.palette.secondary.main],
		labels,
		dataLabels: {
			enabled: true,
			enabledOnSeries: [0],
			background: {
				borderWidth: 0
			}
		},
		grid: {
			borderColor: theme.palette.divider
		},
		legend: {
			show: false
		},
		plotOptions: {
			bar: {
				columnWidth: '50%'
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.75
				}
			}
		},
		stroke: {
			width: [3, 0]
		},
		tooltip: {
			followCursor: true,
			theme: theme.palette.mode
		},
		xaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				color: theme.palette.divider
			},
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			},
			tooltip: {
				enabled: false
			}
		},
		yaxis: {
			labels: {
				offsetX: -16,
				style: {
					colors: theme.palette.text.secondary
				}
			}
		}
	};

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (awaitRender) {
		return null;
	}

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-xl overflow-hidden">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<Typography className="text-xl font-medium tracking-tight leading-6 truncate">
					Indicators Summary
				</Typography>
				<div className="mt-12 sm:mt-0">
					<FuseTabs
						value={tabValue}
						onChange={(_ev, value: number) => setTabValue(value)}
					>
						{Object.entries(ranges).map(([key, label], index) => (
							<FuseTab
								key={key}
								value={index}
								label={label}
							/>
						))}
					</FuseTabs>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
				<div className="flex flex-col flex-auto">
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						Enrolment vs. Graduation Rates
					</Typography>
					<div className="flex flex-col flex-auto">
						<ReactApexChart
							className="flex-auto w-full"
							options={chartOptions}
							series={_.cloneDeep(series[currentRange])}
							height={320}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						Overview
					</Typography>
					<div className="flex-auto grid grid-cols-4 gap-16 mt-24">
						<div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-xl bg-indigo-50 text-indigo-800">
							<Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
								{overview[currentRange]['new-issues']}
							</Typography>
							<Typography className="mt-4 text-sm sm:text-lg font-medium">Total Staffs</Typography>
						</div>
						<div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-xl bg-green-50 text-green-800">
							<Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
								{overview[currentRange]['closed-issues']}
							</Typography>
							<Typography className="mt-4 text-sm sm:text-lg font-medium">Research Ouput</Typography>
						</div>
						<Box
							sx={{
								backgroundColor: (_theme) =>
									_theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-xl"
						>
							<Typography className="text-5xl font-semibold leading-none tracking-tight">
								{overview[currentRange].fixed}
							</Typography>
							<Typography className="mt-4 text-sm font-medium text-center">Accredited Programmes</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: (_theme) =>
									_theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-xl"
						>
							<Typography className="text-5xl font-semibold leading-none tracking-tight">
								{overview[currentRange]['wont-fix']}
							</Typography>
							<Typography className="mt-4 text-sm font-medium text-center">Approved Registrations</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: (_theme) =>
									_theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-xl"
						>
							<Typography className="text-5xl font-semibold leading-none tracking-tight">
								{overview[currentRange]['re-opened']}
							</Typography>
							<Typography className="mt-4 text-sm font-medium text-center">Registrations Under Review</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: (_theme) =>
									_theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-xl"
						>
							<Typography className="text-5xl font-semibold leading-none tracking-tight">
								{overview[currentRange]['needs-triage']}
							</Typography>
							<Typography className="mt-4 text-sm font-medium text-center">Quality Audit</Typography>
						</Box>
					</div>
				</div>
			</div>
		</Paper>
	);
}

export default memo(GithubIssuesWidget);
