import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { useState } from 'react';
import {
	Student,
	useCreateStudentMutation,
	useDeleteStudentMutation,
	useUpdateStudentMutation
} from '../StudentsApi';
import Alert from '@mui/material/Alert';

/**
 * The product header.
 */
function StudentHeader() {
	const routeParams = useParams();
	const { productId } = routeParams;

	const [createProduct] = useCreateStudentMutation();
	const [saveProduct] = useUpdateStudentMutation();
	const [removeProduct] = useDeleteStudentMutation();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;

	const navigate = useNavigate();

	const { name, images, featuredImageId } = watch() as Student;
	const [open, setOpen] = useState(false);

	function handleSaveProduct() {
		saveProduct(getValues() as Student);
	}

	// Function to close the snackbar
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	function handleCreateProduct() {
		createProduct(getValues() as Student)
			.unwrap()
			.then((data) => {
				navigate(`/dashboards/students/students/${data.id}`);
			});
	}

	function handleRemoveProduct() {
		removeProduct(productId);
		navigate('/dashboards/students/students');
	}

	// eslint-disable-next-line react/no-unstable-nested-components
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
		<div
			className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{
						x: 20,
						opacity: 0
					}}
					animate={{
						x: 0,
						opacity: 1,
						transition: { delay: 0.3 }
					}}
				>
					<PageBreadcrumb className="mb-8" />
				</motion.div>

				<div className="flex items-center max-w-full space-x-12">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{images && images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-15 sm:text-2xl truncate font-semibold">
							{name || 'New Student'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Student's Detail
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{productId !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveProduct}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							Remove
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={() => {
								setOpen(true);
								setTimeout(() => {
									navigate('/dashboards/students');
								}, [6000]);
							}}
						>
							Save
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
								Student Saved Successfully
							</Alert>
						</Snackbar>
					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateProduct}
					>
						Add
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default StudentHeader;
