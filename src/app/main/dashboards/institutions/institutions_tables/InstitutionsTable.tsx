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
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { Institution, useGetInstitutionsQuery, useDeleteECommerceProductsMutation } from '../InstitutionsApi';

function InstitutionsTable() {
	// const { data: products, isLoading } = useGetECommerceProductsQuery();
	const { data: institutions, isLoading } = useGetInstitutionsQuery();
	const [removeProducts] = useDeleteECommerceProductsMutation();

	console.log(institutions, isLoading);
	const columns = useMemo<MRT_ColumnDef<Institution>[]>(
		() => [
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
								src={_.find(row.original.images, { id: row.original.featuredImageId })?.url}
								alt={row.original.heiName}
							/>
						) : (
							<img
								className="w-full max-h-36 max-w-36 block rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={row.original.heiName}
							/>
						)}
					</div>
				)
			},
			{
				accessorKey: 'heiName',
				header: 'HEI Name',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/dashboards/institutions/schools/${row.original.id}/${row.original.handle}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.heiName}
					</Typography>
				)
			},
			{
				accessorKey: 'typeOfInstitution',
				header: 'Type of Institution',
				accessorFn: (row) => (
					<div className="flex flex-wrap space-x-2">
						<Chip
							key={row.typeOfInstitution}
							className="text-sm"
							size="small"
							color="default"
							label={row.typeOfInstitution}
						/>
					</div>
				)
			},
			{
				accessorKey: 'campuses',
				header: 'Campuses',
				accessorFn: (row) => `${row.campuses} campuses`
			},
			{
				accessorKey: 'yearOfEstablishment',
				header: 'Year of Establishment',
				accessorFn: (row) => `${row.yearOfEstablishment}`
			},
			{
				accessorKey: 'email',
				header: 'Email',
				accessorFn: (row) => `${row.email}`
			},
			{
				accessorKey: 'numberOfStudents',
				header: 'No of Students',
				accessorFn: (row) => (
					<div className="flex items-center space-x-8">
						<span>{row.numberOfStudents}</span>
						<i
							className={clsx(
								'inline-block w-8 h-8 rounded',
								row.numberOfStudents <= 5 && 'bg-red',
								row.numberOfStudents > 5 && row.numberOfStudents <= 25 && 'bg-orange',
								row.numberOfStudents > 25 && 'bg-green'
							)}
						/>
					</div>
				)
			},
			{
				accessorKey: 'active',
				header: 'Active',
				accessorFn: (row) => (
					<div className="flex items-center">
						{row.active ? (
							<FuseSvgIcon
								className="text-green"
								size={20}
							>
								heroicons-outline:check-circle
							</FuseSvgIcon>
						) : (
							<FuseSvgIcon
								className="text-red"
								size={20}
							>
								heroicons-outline:minus-circle
							</FuseSvgIcon>
						)}
					</div>
				)
			}
		],
		[]
	);


	// const columns = useMemo<MRT_ColumnDef<EcommerceProduct>[]>(
	// 	() => [
	// 		{
	// 			accessorFn: (row) => row.featuredImageId,
	// 			id: 'featuredImageId',
	// 			header: '',
	// 			enableColumnFilter: false,
	// 			enableColumnDragging: false,
	// 			size: 64,
	// 			enableSorting: false,
	// 			Cell: ({ row }) => (
	// 				<div className="flex items-center justify-center">
	// 					{row.original?.images?.length > 0 && row.original.featuredImageId ? (
	// 						<img
	// 							className="w-full max-h-36 max-w-36 block rounded"
	// 							src={_.find(row.original.images, { id: row.original.featuredImageId })?.url}
	// 							alt={row.original.name}
	// 						/>
	// 					) : (
	// 						<img
	// 							className="w-full max-h-36 max-w-36 block rounded"
	// 							src="assets/images/apps/ecommerce/product-image-placeholder.png"
	// 							alt={row.original.name}
	// 						/>
	// 					)}
	// 				</div>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'name',
	// 			header: 'HEI Name',
	// 			Cell: ({ row }) => (
	// 				<Typography
	// 					component={Link}
	// 					to={`/apps/e-commerce/products/${row.original.id}/${row.original.handle}`}
	// 					className="underline"
	// 					color="secondary"
	// 					role="button"
	// 				>
	// 					{row.original.name}
	// 				</Typography>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'categories',
	// 			header: 'Type of Institution',
	// 			accessorFn: (row) => (
	// 				<div className="flex flex-wrap space-x-2">
	// 					{row.categories.map((item) => (
	// 						<Chip
	// 							key={item}
	// 							className="text-sm"
	// 							size="small"
	// 							color="default"
	// 							label={item}
	// 						/>
	// 					))}
	// 				</div>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'priceTaxIncl',
	// 			header: 'Campuses',
	// 			accessorFn: (row) => `${row.priceTaxIncl}`
	// 		},
	// 		{
	// 			accessorKey: 'priceTaxIncl',
	// 			header: 'Year of Establishment',
	// 			accessorFn: (row) => `${row.priceTaxIncl}`
	// 		},
	// 		{
	// 			accessorKey: 'quantity',
	// 			header: 'No of Students',
	// 			accessorFn: (row) => (
	// 				<div className="flex items-center space-x-8">
	// 					<span>{row.quantity}</span>
	// 					<i
	// 						className={clsx(
	// 							'inline-block w-8 h-8 rounded',
	// 							row.quantity <= 5 && 'bg-red',
	// 							row.quantity > 5 && row.quantity <= 25 && 'bg-orange',
	// 							row.quantity > 25 && 'bg-green'
	// 						)}
	// 					/>
	// 				</div>
	// 			)
	// 		},
	// 		{
	// 			accessorKey: 'active',
	// 			header: 'Active',
	// 			accessorFn: (row) => (
	// 				<div className="flex items-center">
	// 					{row.active ? (
	// 						<FuseSvgIcon
	// 							className="text-green"
	// 							size={20}
	// 						>
	// 							heroicons-outline:check-circle
	// 						</FuseSvgIcon>
	// 					) : (
	// 						<FuseSvgIcon
	// 							className="text-red"
	// 							size={20}
	// 						>
	// 							heroicons-outline:minus-circle
	// 						</FuseSvgIcon>
	// 					)}
	// 				</div>
	// 			)
	// 		}
	// 	],
	// 	[]
	// );

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={institutions}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							// // Define your view action here, e.g., navigate to detail view
							// viewProduct(row.original.id);
							closeMenu();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:eye</FuseSvgIcon>
						</ListItemIcon>
						View
					</MenuItem>,
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

export default InstitutionsTable;
