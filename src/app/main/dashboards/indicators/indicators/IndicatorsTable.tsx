/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { Indicator, useDeleteIndicatorsMutation, useGetIndicatorsQuery } from '../IndicatorsApi';

function IndicatorsTable() {
	const { data: indicators, isLoading } = useGetIndicatorsQuery();
	const [removeProducts] = useDeleteIndicatorsMutation();

	console.log({indicators, isLoading});
	const columns = useMemo<MRT_ColumnDef<Indicator>[]>(
		() => [
			{
				accessorKey: 'heiName',
				header: 'Hei Name',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/products/${row.original.handle}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{ row.original.hei_name}
					</Typography>
				)
			},
			{
				accessorKey: 'admissionsRate',
				header: 'Admissions Rate',
				accessorFn: (row) => `${row.admissions_rate} %`
			},
			{
				accessorKey: 'enrolmentRate',
				header: 'Enrolment Rate',
				accessorFn: (row) => `${row.enrolment_rate} %`
			},
			{
				accessorKey: 'graduationRate',
				header: 'Graduation Rate',
				accessorFn: (row) => `${row.graduation_rate} %`
			},
			{
				accessorKey: 'employmentRate',
				header: 'Employment Rate',
				accessorFn: (row) => `${row.employment_rate} %`
			},
			{
				accessorKey: 'staffCount',
				header: 'Staff HeadCount',
				accessorFn: (row) => `${row.staff_count}`
			},
			// {
			// 	accessorKey: 'studentResearchCount',
			// 	header: 'Student Research Count',
			// 	accessorFn: (row) => `${row.student_research_count}`
			// },
			{
				accessorKey: 'internationalStudents',
				header: 'International Students',
				accessorFn: (row) => `${row.international_students}`
			},
			{
				accessorKey: 'year',
				header: 'Academic Year',
				accessorFn: (row) => `${row.year}`
			},
			{
				accessorKey: 'outputStudents',
				header: 'Research Output',
				accessorFn: (row) => `${row.output_students}`
			},
			{
				accessorKey: 'facultyRatio',
				header: 'Student Faculty Ratio',
				accessorFn: (row) => `${row.faculty_ratio}`
			},

		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (

		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={indicators}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						// key={0}
						// onClick={() => {
						// 	// removeProducts([row.original.id]);
						// 	closeMenu();
						// 	table.resetRowSelection();
						// }}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
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
								// removeProducts(selectedRows.map((row) => row.original.id));
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

export default IndicatorsTable;
