/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Programme, useDeleteProgrammesMutation, useGetProgrammesQuery } from '../ProgrammesApi';

function ProgrammesTable() {
	const { data: programmes, isLoading } = useGetProgrammesQuery();
	const [removeProducts] = useDeleteProgrammesMutation();

	console.log({programmes, isLoading});
	const columns = useMemo<MRT_ColumnDef<Programme>[]>(
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
				accessorKey: 'campus_name',
				header: 'Campus Name',
				accessorFn: (row) => `${row.campus_name} `
			},
			{
				accessorKey: 'faculty_and_department',
				header: 'Faculty and Department',
				accessorFn: (row) => `${row.faculty_and_department} `
			},
			{
				accessorKey: 'qualification_name',
				header: 'Qualification Name',
				accessorFn: (row) => `${row.qualification_name} `
			},
			{
				accessorKey: 'qualification_type',
				header: 'Qualification Type',
				accessorFn: (row) => `${row.qualification_type} `
			},
			{
				accessorKey: 'nqf_level',
				header: 'NQF Level',
				accessorFn: (row) => `${row.nqf_level}`
			},

			{
				accessorKey: 'number_of_credits',
				header: 'Number of Credits',
				accessorFn: (row) => `${row.number_of_credits}`
			},
			{
				accessorKey: 'accreditation_status',
				header: 'Accreditation Status',
				accessorFn: (row) => `${row.accreditation_status}`
			},
			{
				accessorKey: 'program_duration',
				header: 'Program Duration',
				accessorFn: (row) => `${row.program_duration}`
			},
			{
				accessorKey: 'mode_of_study',
				header: 'Mode of Study',
				accessorFn: (row) => `${row.mode_of_study}`
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
				data={programmes}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem>
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

export default ProgrammesTable;
