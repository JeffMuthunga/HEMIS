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
import { ResearchProduct, useDeleteResearchProductsMutation, useGetResearchProductsQuery } from '../ResearchApi';

function ResarchTable() {
	const { data: products, isLoading } = useGetResearchProductsQuery();
	const [removeProducts] = useDeleteResearchProductsMutation();

	const columns = useMemo<MRT_ColumnDef<ResearchProduct>[]>(() => [
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
							alt={row.original.researchTitle}
						/>
					) : (
						<img
							className="w-full max-h-36 max-w-36 block rounded"
							src="assets/images/apps/research/product-image-placeholder.png"
							alt={row.original.researchTitle}
						/>
					)}
				</div>
			)
		},
		{
			accessorKey: 'researchTitle',
			header: 'Research Title',
			Cell: ({ row }) => (
				<Typography
					component={Link}
					to={`/apps/research/products/${row.original.id}/${row.original.researchTitle}`}
					className="underline"
					color="secondary"
					role="button"
				>
					{row.original.researchTitle}
				</Typography>
			)
		},
		{
			accessorKey: 'typeOfResearchOutcome',
			header: 'Type of Research',
			Cell: ({ row }) => (
				<Typography>{row.original.typeOfResearchOutcome}</Typography>
			)
		},
		{
			accessorKey: 'namesOfResearchers',
			header: 'Researchers',
			Cell: ({ row }) => (
				<Typography>{row.original.namesOfResearchers}</Typography>
			)
		},
		{
			accessorKey: 'areasfResearch',
			header: 'Research Areas',
			Cell: ({ row }) => (
				<Typography>{row.original.areasfResearch}</Typography>
			)
		},
		{
			accessorKey: 'academicYear',
			header: 'Academic Year',
			Cell: ({ row }) => (
				<Typography>{row.original.academicYear}</Typography>
			)
		},
		{
			accessorKey: 'heiDetails',
			header: 'HEI Details',
			Cell: ({ row }) => (
				<Typography>{row.original.heiDetails}</Typography>
			)
		},
		{
			accessorKey: 'publicationDate',
			header: 'Publication Date',
			Cell: ({ row }) => (
				<Typography>{row.original.publicationDate}</Typography>
			)
		},
		{
			accessorKey: 'journalConferenceDate',
			header: 'Journal/Conference Date',
			Cell: ({ row }) => (
				<Typography>{row.original.journalConferenceDate}</Typography>
			)
		},
		{
			accessorKey: 'volumeIssue',
			header: 'Volume/Issue',
			Cell: ({ row }) => (
				<Typography>{row.original.volumeIssue}</Typography>
			)
		},
		{
			accessorKey: 'pages',
			header: 'Pages',
			Cell: ({ row }) => (
				<Typography>{row.original.pages}</Typography>
			)
		},
		{
			accessorKey: 'DOI',
			header: 'DOI',
			Cell: ({ row }) => (
				<Typography>{row.original.DOI}</Typography>
			)
		},
		{
			accessorKey: 'fundingScore',
			header: 'Funding Score',
			Cell: ({ row }) => (
				<Typography>{row.original.fundingScore}</Typography>
			)
		},
		{
			accessorKey: 'abstract',
			header: 'Abstract',
			Cell: ({ row }) => (
				<Typography>{row.original.abstract}</Typography>
			)
		},
		{
			accessorKey: 'active',
			header: 'Active',
			Cell: ({ row }) => (
				<div className="flex items-center">
					{row.original.active ? (
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

export default ResarchTable;