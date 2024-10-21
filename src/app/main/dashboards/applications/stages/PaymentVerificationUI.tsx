import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	TextField,
	Grid,
	CircularProgress
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

function PaymentVerificationUI() {

	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	const [paymentId, setPaymentId] = useState('');
	const [amount, setAmount] = useState('');
	const [transactionDate, setTransactionDate] = useState<Date | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			// Handle submission result
		}, 2000);
	};

	const action = (
		<React.Fragment>
			<Button color="secondary" size="large" onClick={handleClose}>
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
							Payment Verification
						</Typography>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Payment ID"
								variant="outlined"
								value={paymentId}
								onChange={(e) => setPaymentId(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Amount"
								variant="outlined"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								className="mt-8 mb-16"
								required
								label="HEI Name"
								id="heiName"
								variant="outlined"
								fullWidth
								type="date"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button
								variant="outlined"
								component="label"
								startIcon={<FuseSvgIcon>heroicons-outline:upload</FuseSvgIcon>}
								className="w-full h-52 px-32"
							>
								Upload Proof of Payment
								<input
									type="file"
									hidden
									onChange={handleFileChange}
									accept=".pdf,.png,.jpg,.jpeg"
								/>
							</Button>
							{file && (
								<Typography variant="body2" className="mt-8">
									File selected: {file.name}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isSubmitting}
								className="w-full"
								onClick={() => {
									setOpen(true);
									setTimeout(() => {
										navigate('/dashboards/institutions');
									}, [6000]);
								}}
							>
								{isSubmitting ? (
									<CircularProgress size={24} />
								) : (
									<>
										<FuseSvgIcon size={20}>heroicons-outline:check</FuseSvgIcon>
										<span className="mx-8">Verify Payment</span>
									</>
								)}
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={6000}
								onClose={handleClose}
								message="Note archived"
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
									Payment Verified Successfully
								</Alert>
							</Snackbar>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</LocalizationProvider>
	);
};

export default PaymentVerificationUI;