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

// Mock data for workflows
const workflows = [
	{
		id: 1,
		name: 'Application for Registration of Private Higher Education Institutions',
		description: 'Applicant submits application through HEMIS with required documentation.',
		department: 'NCHE',
		status: 'In Progress',
		createdAt: '2024-01-10',
	},
	{
		id: 2,
		name: 'Accreditation of New Programmes',
		description: 'HEI submits application for accreditation through HEMIS.',
		department: 'Accreditation',
		status: 'Pending Review',
		createdAt: '2024-02-15',
	},
	{
		id: 3,
		name: 'Quality Improvement Process for Programmes',
		description: 'HEI submits an improvement plan after receiving accreditation feedback.',
		department: 'Accreditation',
		status: 'Complete',
		createdAt: '2024-03-10',
	},
	{
		id: 4,
		name: 'Institutional Audit Process',
		description: 'NCHE initiates institutional audit via HEMIS.',
		department: 'Audit',
		status: 'Scheduled',
		createdAt: '2024-04-05',
	},
	{
		id: 5,
		name: 'Submission of Annual Reports',
		description: 'HEIs submit annual reports on performance through HEMIS.',
		department: 'Quality Assurance',
		status: 'In Progress',
		createdAt: '2024-05-12',
	},
	{
		id: 6,
		name: 'Program Accreditation Monitoring',
		description: 'NCHE monitors ongoing programs for compliance.',
		department: 'Accreditation',
		status: 'In Progress',
		createdAt: '2024-06-20',
	},
	{
		id: 7,
		name: 'Student Data Submission',
		description: 'HEIs submit student data and enrollment figures via HEMIS.',
		department: 'Statistics',
		status: 'Pending Submission',
		createdAt: '2024-07-01',
	},
	{
		id: 8,
		name: 'Examination Results Submission',
		description: 'HEIs submit exam results through HEMIS.',
		department: 'Examinations',
		status: 'Submitted',
		createdAt: '2024-08-14',
	},
	{
		id: 9,
		name: 'Funding Application Process',
		description: 'Students submit applications for funding through HEMIS.',
		department: 'Funding',
		status: 'Under Review',
		createdAt: '2024-09-10',
	},
	{
		id: 10,
		name: 'Faculty Performance Review',
		description: 'HEIs submit performance reviews of faculty members.',
		department: 'HR',
		status: 'Completed',
		createdAt: '2024-09-30',
	}
];

function WorkflowsTable() {
	const navigate = useNavigate();
	const columns = useMemo<MRT_ColumnDef<typeof workflows[0]>[]>(() => [
		{
			accessorKey: 'name',
			header: 'Workflow Name',
			Cell: ({ row }) => (
				<Typography className="underline" color="secondary" role="button">
					{row.original.name}
				</Typography>
			),
		},
		{
			accessorKey: 'description',
			header: 'Description',
			accessorFn: (row) => `${row.description}`,
		},
		{
			accessorKey: 'department',
			header: 'Department',
			accessorFn: (row) => `${row.department}`,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			accessorFn: (row) => `${row.status}`,
		},
		{
			accessorKey: 'createdAt',
			header: 'Created At',
			accessorFn: (row) => `${row.createdAt}`,
		},
	], []);

	// You can replace this with an actual loading state if fetching from API
	const isLoading = false;

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full" elevation={0}>
			<DataTable
				data={workflows}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							navigate(`/dashboards/workflow-mgt/hei-registration-workflows`);
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:arrow-uturn-right</FuseSvgIcon>
						</ListItemIcon>
						Workflow Stages & Transitions
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
								console.log(`Deleting selected workflows: ${selectedRows.map((row) => row.original.id).join(', ')}`);
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

export default WorkflowsTable;
