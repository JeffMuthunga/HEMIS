import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Tooltip,
	LinearProgress,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Snackbar,
	Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { format } from 'date-fns';

// Mock data for batches
const mockBatches = [
	{ id: 1, name: 'HEI Registration Batch 2023-Q1', date: '2023-03-15', status: 'Completed', recordCount: 150 },
	{ id: 2, name: 'Student Enrollment 2023', date: '2023-05-01', status: 'In Progress', recordCount: 500 },
	{ id: 3, name: 'Faculty Data Update', date: '2023-06-10', status: 'Pending', recordCount: 75 },
	{ id: 4, name: 'Research Grants 2023', date: '2023-07-01', status: 'Failed', recordCount: 30 },
];

const statusColors = {
	Completed: 'success',
	'In Progress': 'info',
	Pending: 'warning',
	Failed: 'error',
};

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Batch Name', flex: 1 },
	{ field: 'date', headerName: 'Upload Date', flex: 1 },
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params) => (
			<Chip
				label={params.value}
				color={statusColors[params.value] || 'default'}
				size="small"
			/>
		),
	},
	{ field: 'recordCount', headerName: 'Record Count', flex: 1 },
];

const batchStatusData = [
	{ name: 'Completed', value: 1 },
	{ name: 'In Progress', value: 1 },
	{ name: 'Pending', value: 1 },
	{ name: 'Failed', value: 1 },
];

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

function NCHEBatchManagement() {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
	const [previewData, setPreviewData] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setIsUploading(true);
			// Simulating file upload progress
			const interval = setInterval(() => {
				setUploadProgress((prevProgress) => {
					if (prevProgress >= 100) {
						clearInterval(interval);
						setIsUploading(false);
						setSnackbarMessage('File uploaded successfully!');
						setSnackbarOpen(true);
						return 100;
					}
					return prevProgress + 10;
				});
			}, 500);
		}
	};

	const handleDownloadTemplate = () => {
		// In a real application, this would trigger the download of an Excel template
		setSnackbarMessage('Template download started!');
		setSnackbarOpen(true);
	};

	const handleSyncData = () => {
		// Simulating data sync process
		setSnackbarMessage('Data synchronization in progress...');
		setSnackbarOpen(true);
		setTimeout(() => {
			setSnackbarMessage('Data synchronized successfully!');
			setSnackbarOpen(true);
		}, 3000);
	};

	const handlePreviewBatch = (batchId: number) => {
		// In a real application, this would fetch preview data for the selected batch
		setPreviewData([
			{ id: 1, field1: 'Sample Data 1', field2: 'Value 1' },
			{ id: 2, field1: 'Sample Data 2', field2: 'Value 2' },
			{ id: 3, field1: 'Sample Data 3', field2: 'Value 3' },
		]);
		setIsPreviewDialogOpen(true);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<div>
						<PageBreadcrumb className="mb-8" />
						<Typography className="text-4xl font-extrabold leading-none tracking-tight">
							NCHE Batch Data Management
						</Typography>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						<Box className="flex space-x-2 mb-4">
							<Button
								variant="contained"
								color="primary"
								startIcon={<FuseSvgIcon>heroicons-outline:arrow-up-tray</FuseSvgIcon>}
								component="label"
								disabled={isUploading}
							>
								Upload Batch
								<input type="file" hidden onChange={handleFileUpload} accept=".xlsx,.xls,.csv" />
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								startIcon={<FuseSvgIcon>heroicons-outline:arrow-down-tray</FuseSvgIcon>}
								onClick={handleDownloadTemplate}
							>
								Download Template
							</Button>
							<Button
								variant="contained"
								color="success"
								startIcon={<FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>}
								onClick={handleSyncData}
							>
								Sync Data
							</Button>
						</Box>
						{isUploading && (
							<Box className="mb-4">
								<LinearProgress variant="determinate" value={uploadProgress} />
								<Typography variant="caption" className="mt-1">
									Uploading: {uploadProgress}%
								</Typography>
							</Box>
						)}
						<DataGrid
							rows={mockBatches}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							checkboxSelection
							disableSelectionOnClick
							autoHeight
							className="mt-4"
							components={{
								Toolbar: () => (
									<Box className="flex justify-between items-center p-2">
										<Typography variant="h6">Recent Batches</Typography>
										<TextField
											variant="outlined"
											size="small"
											placeholder="Search batches..."
											InputProps={{
												startAdornment: <FuseSvgIcon>heroicons-outline:search</FuseSvgIcon>,
											}}
										/>
									</Box>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper elevation={2} className="p-4">
							<Typography variant="h6" className="mb-4">Batch Status Overview</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={batchStatusData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{batchStatusData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Legend />
									<RechartsTooltip />
								</PieChart>
							</ResponsiveContainer>
						</Paper>
						<Paper elevation={2} className="p-4 mt-4">
							<Typography variant="h6" className="mb-4">Quick Actions</Typography>
							<Button
								fullWidth
								variant="outlined"
								color="primary"
								className="mb-2"
								startIcon={<FuseSvgIcon>heroicons-outline:document-report</FuseSvgIcon>}
							>
								Generate Report
							</Button>
							<Button
								fullWidth
								variant="outlined"
								color="secondary"
								className="mb-2"
								startIcon={<FuseSvgIcon>heroicons-outline:chart-bar</FuseSvgIcon>}
							>
								View Analytics
							</Button>
							<Button
								fullWidth
								variant="outlined"
								color="info"
								startIcon={<FuseSvgIcon>heroicons-outline:cog</FuseSvgIcon>}
							>
								Batch Settings
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Paper>

			<Dialog open={isPreviewDialogOpen} onClose={() => setIsPreviewDialogOpen(false)} maxWidth="md" fullWidth>
				<DialogTitle>Batch Preview</DialogTitle>
				<DialogContent>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Field 1</TableCell>
									<TableCell>Field 2</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{previewData.map((row) => (
									<TableRow key={row.id}>
										<TableCell>{row.field1}</TableCell>
										<TableCell>{row.field2}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message={snackbarMessage}
			/>
		</div>
	);
}

export default NCHEBatchManagement;