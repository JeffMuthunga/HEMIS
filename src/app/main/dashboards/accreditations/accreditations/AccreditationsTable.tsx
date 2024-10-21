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
import { Accreditation, useDeleteAccreditationsMutation, useGetAccreditationsQuery } from '../AccreditationsApi';

function AccreditationsTable() {
	const { data: accreditations, isLoading } = useGetAccreditationsQuery();
	const [removeProducts] = useDeleteAccreditationsMutation();

	console.log({accreditations, isLoading});
	const columns = useMemo<MRT_ColumnDef<Accreditation>[]>(
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
				accessorKey: 'site_and_contract_information',
				header: 'Sites and Contract Information',
				accessorFn: (row) => `${row.site_and_contract_information} `
			},
			{
				accessorKey: 'programme_name',
				header: 'Programme Name',
				accessorFn: (row) => `${row.programme_name} `
			},
			{
				accessorKey: 'nqf_level',
				header: 'NQF Level',
				accessorFn: (row) => `${row.nqf_level} `
			},
			{
				accessorKey: 'credits',
				header: 'Credits',
				accessorFn: (row) => `${row.credits} `
			},
			{
				accessorKey: 'stakeholder_involvement',
				header: 'Stakeholder Involvement',
				accessorFn: (row) => `${row.stakeholder_involvement}`
			},

			{
				accessorKey: 'accreditation_status',
				header: 'Accreditation Status',
				accessorFn: (row) => `${row.accreditation_status}`
			},
			{
				accessorKey: 'year_of_accreditation',
				header: 'Year of Accreditation',
				accessorFn: (row) => `${row.year_of_accreditation}`
			},
			{
				accessorKey: 'department',
				header: 'Department',
				accessorFn: (row) => `${row.department}`
			},
			{
				accessorKey: 'faculty',
				header: 'Faculty',
				accessorFn: (row) => `${row.faculty}`
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
				data={accreditations}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						// key={0}
						// onClick={() => {
						// 	removeProducts([row.original.id]);
						// 	closeMenu();
						// 	table.resetRowSelection();
						// }}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:eye</FuseSvgIcon>
						</ListItemIcon>
						View
					</MenuItem>,
					<MenuItem
						// key={0}
						// onClick={() => {
						// 	removeProducts([row.original.id]);
						// 	closeMenu();
						// 	table.resetRowSelection();
						// }}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Discredit
					</MenuItem>,
					<MenuItem
						// key={0}
						// onClick={() => {
						// 	removeProducts([row.original.id]);
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

export default AccreditationsTable;
