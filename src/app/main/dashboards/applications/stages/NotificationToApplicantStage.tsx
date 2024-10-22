import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	TextField,
	Chip,
	Tooltip,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Divider,
	Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const notificationTypes = [
	{ value: 'approval', label: 'Approval', color: '#4caf50' },
	{ value: 'conditional_approval', label: 'Conditional Approval', color: '#ff9800' },
	{ value: 'rejection', label: 'Rejection', color: '#f44336' },
	{ value: 'additional_info', label: 'Request for Additional Information', color: '#2196f3' },
];

const applicationSummary = [
	{ name: 'Document Verification', value: 85 },
	{ name: 'Technical Review', value: 78 },
	{ name: 'Financial Evaluation', value: 92 },
];

function NotificationToApplicantStage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [notificationType, setNotificationType] = useState('');
	const [notificationDate, setNotificationDate] = useState<Date | null>(null);
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [additionalNotes, setAdditionalNotes] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setOpen(true);
		}, 2000);
	};

	const getNotificationTypeColor = () => {
		const type = notificationTypes.find(t => t.value === notificationType);
		return type ? type.color : '#000';
	};

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<LocalizationProvider>
			<div className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<div>
						<PageBreadcrumb className="mb-8" />
						<Typography className="text-4xl font-extrabold leading-none tracking-tight">
							Notification to Applicant
						</Typography>
						<div>
							<Typography className="text-15 sm:text-2xl truncate font-semibold">
								Namibia University of Science and Technology
							</Typography>
							<Typography className="text-15 sm:text-2xl truncate font-medium">
								Tracking No - <span className="text-red-900">NCHE/HEI/Reg/0005f</span>
							</Typography>
						</div>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<InputLabel id="notification-type-label">Notification Type</InputLabel>
								<Select
									labelId="notification-type-label"
									value={notificationType}
									onChange={(e) => setNotificationType(e.target.value)}
									label="Notification Type"
									required
								>
									{notificationTypes.map((type) => (
										<MenuItem key={type.value} value={type.value}>
											{type.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Notification Date"
								value={notificationDate}
								onChange={(newValue) => setNotificationDate(newValue)}
								renderInput={(params) => <TextField {...params} fullWidth required />}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Subject"
								variant="outlined"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Notification Message"
								variant="outlined"
								multiline
								rows={6}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Additional Notes"
								variant="outlined"
								multiline
								rows={3}
								value={additionalNotes}
								onChange={(e) => setAdditionalNotes(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Divider className="my-16" />
							<Typography variant="h6" className="mb-16">Application Summary</Typography>
							<Box className="flex justify-between items-center">
								<ResponsiveContainer width="50%" height={200}>
									<PieChart>
										<Pie
											data={applicationSummary}
											cx="50%"
											cy="50%"
											labelLine={false}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{applicationSummary.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
											))}
										</Pie>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
								<Box>
									{applicationSummary.map((item) => (
										<Typography key={item.name} variant="body2" className="mb-8">
											{item.name}: <Chip label={`${item.value}%`} color="primary" size="small" />
										</Typography>
									))}
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isSubmitting || !notificationType || !notificationDate || !subject || !message}
								className="w-full"
								style={{ backgroundColor: getNotificationTypeColor() }}
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
										<FuseSvgIcon size={20}>heroicons-outline:mail</FuseSvgIcon>
										<span className="mx-8">Send Notification</span>
									</>
								)}
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={6000}
								onClose={handleClose}
								message="Notification sent to applicant"
								action={action}
								anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
								sx={{ zIndex: 50 }}
							>
								<Alert
									onClose={handleClose}
									severity="success"
									variant="filled"
									sx={{ width: '100%' }}
								>
									Notification Sent Successfully
								</Alert>
							</Snackbar>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</LocalizationProvider>
	);
}

export default NotificationToApplicantStage;