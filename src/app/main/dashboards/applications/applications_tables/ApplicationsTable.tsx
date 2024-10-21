/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const applications = [
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/00561b',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		workflow_stage: 'Receiving',
		stage: 'receiving',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	},
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/9089g',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		workflow_stage: 'Payment verification',
		stage: 'payment_verification',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	},
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/0341b',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		workflow_stage: 'Document Verification',
		stage: 'document_verification',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	},
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/0023',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		stage: 'technical_review',
		workflow_stage: 'Technical Review',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	},
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/4501b',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		workflow_stage: 'Financial Evaluation',
		stage: 'financial_evaluation',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	},
	{
		id: 1,
		tracking_no: 'NCHE/HEI/Reg/0471b',
		reference: 'NCHE-HEI-APP',
		applicant: 'Ronald Misheveve',
		process: 'HEI-Registration',
		institution_registering: 'Strathmore University',
		workflow_stage: 'Notification to Applicant',
		stage: 'notification_to_applicant',
		status: 'In progress',
		priority: 'High',
		date_received: '12-12-2024',
		from: 'Hemis Admin',
		to: 'Hemis Director'
	}
];


function ApplicationsTable() {
	const navigate = useNavigate();
	const columns = useMemo<MRT_ColumnDef<typeof applications[0]>[]>(() => [
		{
			accessorKey: 'tracking_no',
			header: 'Tracking No',
			Cell: ({ row }) => (
				<Typography className="underline" color="secondary" role="button">
					{row.original.tracking_no}
				</Typography>
			)
		},
		{
			accessorKey: 'reference',
			header: 'Ref id',
			accessorFn: (row) => `${row.reference}`
		},
		{
			accessorKey: 'applicant',
			header: 'Applicant',
			accessorFn: (row) => `${row.applicant}`
		},
		{
			accessorKey: 'institution_registering',
			header: 'Institution Registering',
			accessorFn: (row) => `${row.institution_registering}`
		},
		{
			accessorKey: 'workflow_stage',
			header: 'Workflow Stage',
			Cell: ({ row }) => (
				<Typography className="underline" color="primary" role="button">
					{row.original.workflow_stage}
				</Typography>
			)
		},
		{
			accessorKey: 'status',
			header: 'status',
			accessorFn: (row) => `${row.status}`
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			accessorFn: (row) => `${row.priority}`
		},
		{
			accessorKey: 'date_received',
			header: 'Date Received',
			accessorFn: (row) => `${row.date_received}`
		},
		{
			accessorKey: 'from',
			header: 'From',
			accessorFn: (row) => `${row.from}`
		},
		{
			accessorKey: 'to',
			header: 'To',
			accessorFn: (row) => `${row.to}`
		}
	], []);

	// You can replace this with an actual loading state if fetching from API
	const isLoading = false;

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			   elevation={0}>
			<DataTable
				data={applications}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							navigate(`/dashboards/applications/${row.original.stage}`);
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:arrow-uturn-right</FuseSvgIcon>
						</ListItemIcon>
						{`Go to ${row.original.workflow_stage} stage`}
					</MenuItem>
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								console.log(`Deleting selected applications: ${selectedRows.map((row) => row.original.id).join(', ')}`);
								table.resetRowSelection();
							}}
							className="flex shrink min-w-36 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default ApplicationsTable;
