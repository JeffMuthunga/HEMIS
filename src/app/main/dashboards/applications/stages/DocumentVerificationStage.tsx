import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Chip,
	TextField
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const requiredDocuments = [
	{ name: 'Certificate of Incorporation', status: 'pending' },
	{ name: 'Academic Programs List', status: 'pending' },
	{ name: 'Financial Statements', status: 'pending' },
	{ name: 'Quality Assurance Policy', status: 'pending' },
	{ name: 'Campus Facilities Documentation', status: 'pending' }
];

function DocumentVerificationStage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [documents, setDocuments] = useState(requiredDocuments);
	const [comments, setComments] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleFileUpload = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const newDocuments = [...documents];
			newDocuments[index] = { ...newDocuments[index], status: 'uploaded' };
			setDocuments(newDocuments);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setOpen(true);
		}, 2000);
	};

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small"
					// onClick={handleClose}
			>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				// onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<LocalizationProvider>
			<div
				className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<div>
						<PageBreadcrumb className="mb-8" />
						<Typography className="text-4xl font-extrabold leading-none tracking-tight">
							Document Verification Stage
						</Typography>
						<div>
							<Typography className="text-15 sm:text-2xl truncate font-semibold">
								Namibia University of Science and Technology
							</Typography>
							<Typography className="text-15 sm:text-2xl truncate font-medium">
								Tracking No - <span className="text-red-900">NCHE/HEI/Reg/0002c</span>
							</Typography>
						</div>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant="h6" className="mb-16">Required Documents</Typography>
							<List>
								{documents.map((doc, index) => (
									<ListItem key={index} className="px-0 py-4">
										<ListItemIcon>
											<FuseSvgIcon>{doc.status === 'uploaded' ? 'heroicons-outline:check-circle' : 'heroicons-outline:document'}</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText primary={doc.name} />
										<Chip
											label={doc.status === 'uploaded' ? 'Uploaded' : 'Pending'}
											color={doc.status === 'uploaded' ? 'success' : 'default'}
											size="small"
										/>
										<Button
											variant="outlined"
											component="label"
											size="small"
											className="ml-16"
										>
											Upload
											<input
												type="file"
												hidden
												onChange={handleFileUpload(index)}
												accept=".pdf,.doc,.docx"
											/>
										</Button>
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Verification Comments"
								variant="outlined"
								multiline
								rows={4}
								value={comments}
								onChange={(e) => setComments(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isSubmitting || documents.some(doc => doc.status === 'pending')}
								className="w-full"
								onClick={() => {
									setOpen(true);
									setTimeout(() => {
										navigate('/dashboards/institutions');
									}, 6000);
								}}
							>
								{isSubmitting ? (
									<CircularProgress size={24} />
								) : (
									<>
										<FuseSvgIcon size={20}>heroicons-outline:check</FuseSvgIcon>
										<span className="mx-8">Verify Documents</span>
									</>
								)}
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={6000}
								onClose={handleClose}
								message="Documents verified"
								action={action}
								anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
								sx={{ zIndex: 50 }}
							>
								<Alert
									// onClose={handleClose}
									severity="success"
									variant="filled"
									sx={{ width: '100%' }}
								>
									Documents Verified Successfully
								</Alert>
							</Snackbar>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</LocalizationProvider>
	);
}

export default DocumentVerificationStage;