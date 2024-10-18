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
import { Student, useDeleteStudentsMutation, useGetStudentsQuery } from '../StudentsApi';

function StudentsTable() {
	const { data: students, isLoading } = useGetStudentsQuery();
	const [removeProducts] = useDeleteStudentsMutation();

	console.log(students, isLoading);
	const columns = useMemo<MRT_ColumnDef<Student>[]>(
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
								alt={row.original.name}
							/>
						) : (
							<img
								className="w-full max-h-36 max-w-36 block rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={row.original.name}
							/>
						)}
					</div>
				)
			},
			{
				accessorKey: 'name',
				header: 'Name',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/products/${row.original.id}/${row.original.handle}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.name}
					</Typography>
				)
			},
			{
				accessorKey: 'surname',
				header: 'Surname',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/products/${row.original.id}/${row.original.handle}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.surname}
					</Typography>
				)
			},
			{
				accessorKey: 'studentIdentifier',
				header: 'Student Identifier',
				accessorFn: (row) => `${row.studentIdentifier}`
			},
			{
				accessorKey: 'dateOfBirth',
				header: 'D.O.B',
				accessorFn: (row) => `${row.dateOfBirth}`
			},
			{
				accessorKey: 'email',
				header: 'Email',
				accessorFn: (row) => `${row.email}`
			},
			{
				accessorKey: 'mobileNo',
				header: 'Mobile',
				accessorFn: (row) => `${row.mobileNo}`
			},
			{
				accessorKey: 'qualificationCode',
				header: 'Qualification Code',
				accessorFn: (row) => `${row.qualificationCode}`
			},
			{
				accessorKey: 'faculty',
				header: 'Faculty',
				accessorFn: (row) => `${row.faculty}`
			},
			{
				accessorKey: 'department',
				header: 'Department',
				accessorFn: (row) => `${row.department}`
			},
			{
				accessorKey: 'marginalized',
				header: 'Marginalized',
				accessorFn: (row) => `${row.marginalized}`
			},
			{
				accessorKey: 'disability',
				header: 'Disability',
				accessorFn: (row) => `${row.disability}`
			},
			{
				accessorKey: 'sourceOfFunding',
				header: 'Source Of Funding',
				accessorFn: (row) => `${row.sourceOfFunding}`
			},
			{
				accessorKey: 'examinationGrade',
				header: 'Examination Grade',
				accessorFn: (row) => `${row.examinationGrade}`
			},
			{
				accessorKey: 'sex',
				header: 'Sex',
				accessorFn: (row) => (
					<div className="flex items-center space-x-8">
						<span>{row.sex}</span>
						<i
							className={clsx(
								'inline-block w-8 h-8 rounded',
								row.sex === 'Male' && 'bg-blue',
								row.sex === 'Female' && 'bg-rose',
								row.sex === 'Other' && 'bg-orange'
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

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={students}
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

export default StudentsTable;
