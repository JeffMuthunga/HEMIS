/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Chip, ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { StaffProduct, useDeleteStaffProductsMutation, useGetStaffProductsQuery } from '../StaffApi';

function StaffTable() {
	const { data: products, isLoading } = useGetStaffProductsQuery();
	const [removeProducts] = useDeleteStaffProductsMutation();

	const columns = useMemo<MRT_ColumnDef<StaffProduct>[]>(() => [
		{
			accessorFn: (row) => row.featuredImageId,
			id: 'featuredImageId',
			header: '',
			enableColumnFilter: false,
			enableColumnDragging: false,
			size: 64,
			enableSorting: false,
			Cell: ({ row }) => (
				<div className="flex items-center justify-center">
					{row.original?.images?.length > 0 && row.original.featuredImageId ? (
						<img
							className="w-full max-h-36 max-w-36 block rounded"
							// src={_.find(row.original.images, { id: row.original.featuredImageId })?.url}
							alt={row.original.StaffName}
						/>
					) : (
						<img
							className="w-full max-h-36 max-w-36 block rounded"
							src="assets/images/apps/staff/product-image-placeholder.png"
							alt={row.original.StaffName}
						/>
					)}
				</div>
			)
		},
		{
			accessorKey: 'Name',
			header: 'First Name',
			Cell: ({ row }) => (
				<Typography
					component={Link}
					to={`/apps/staff/products/${row.original.id}/${row.original.StaffName}`}
					className="underline"
					color="secondary"
					role="button"
				>
					{row.original.StaffName}
				</Typography>
			)
		},
		{
			accessorKey: 'Surname',
			header: 'Surname',
			accessorFn: (row) => (
				<Typography>{row.Surname}</Typography>
			)
		},
		{
			accessorKey: 'Sex',
			header: 'Gender',
			accessorFn: (row) => (
				<Typography>{row.Sex}</Typography>
			)
		},
		{
			accessorKey: 'DateOfBirth',
			header: 'Date of Birth',
			accessorFn: (row) => (
				<Typography>{row.DateOfBirth}</Typography>
			)
		},
		{
			accessorKey: 'ContactInformation',
			header: 'Contact Info',
			accessorFn: (row) => (
				<Typography>{row.ContactInformation}</Typography>
			)
		},
		{
			accessorKey: 'Qualification',
			header: 'Qualification',
			accessorFn: (row) => (
				<Typography>{row.Qualification}</Typography>
			)
		},
		{
			accessorKey: 'AcademicEmploymentFunction',
			header: 'Academic Function',
			accessorFn: (row) => (
				<Typography>{row.AcademicEmploymentFunction}</Typography>
			)
		},
		{
			accessorKey: 'active',
			header: 'Active',
			accessorFn: (row) => (
				<div className="flex items-center">
					{row.active ? (
						<FuseSvgIcon className="text-green" size={20}>
							heroicons-outline:check-circle
						</FuseSvgIcon>
					) : (
						<FuseSvgIcon className="text-red" size={20}>
							heroicons-outline:minus-circle
						</FuseSvgIcon>
					)}
				</div>
			)
		}
	], []);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={products}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeProducts([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
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
								removeProducts(selectedRows.map((row) => row.original.id));
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

export default StaffTable;
