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
import Alert from '@mui/material/Alert';
import Application from "./Application";

/**
 * The product header.
 */
function ApplicationHeader() {
	const routeParams = useParams();
	const { productId } = routeParams;


	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;

	const navigate = useNavigate();

	// const { name, images, featuredImageId } = watch() as Application;
	const [open, setOpen] = useState(false);


	// Function to close the snackbar
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// eslint-disable-next-line react/no-unstable-nested-components
	const action = (
		<React.Fragment>
			<Button color="secondary" size="large"
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

				{/*<div className="flex items-center max-w-full space-x-12">*/}
				{/*	<motion.div*/}
				{/*		className="hidden sm:flex"*/}
				{/*		initial={{ scale: 0 }}*/}
				{/*		animate={{ scale: 1, transition: { delay: 0.3 } }}*/}
				{/*	>*/}
				{/*		{images && images.length > 0 && featuredImageId ? (*/}
				{/*			<img*/}
				{/*				className="w-32 sm:w-48 rounded"*/}
				{/*				src={_.find(images, { id: featuredImageId })?.url}*/}
				{/*				alt='name'*/}
				{/*			/>*/}
				{/*		) : (*/}
				{/*			<img*/}
				{/*				className="w-32 sm:w-48 rounded"*/}
				{/*				src="assets/images/apps/ecommerce/product-image-placeholder.png"*/}
				{/*				alt='name'*/}
				{/*			/>*/}
				{/*		)}*/}
				{/*	</motion.div>*/}
				{/*	<motion.div*/}
				{/*		className="flex flex-col min-w-0"*/}
				{/*		initial={{ x: -20 }}*/}
				{/*		animate={{ x: 0, transition: { delay: 0.3 } }}*/}
				{/*	>*/}
				{/*		<div>*/}
				{/*			<Typography className="text-15 sm:text-2xl truncate font-semibold">*/}
				{/*				{name || 'Namibia Strathmore University'}*/}
				{/*			</Typography>*/}
				{/*			<Typography className="text-15 sm:text-2xl truncate font-medium">*/}
				{/*				Tracking No - <span className='text-red-900'>NCHE/HEI/Reg/0001b</span>*/}
				{/*			</Typography>*/}
				{/*		</div>*/}
				{/*		<Typography*/}
				{/*			variant="caption"*/}
				{/*			className="font-medium"*/}
				{/*		>*/}
				{/*			HEI Application Receiving Stage*/}
				{/*		</Typography>*/}
				{/*	</motion.div>*/}
				{/*</div>*/}
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
								// const data  = getValues();
								// let persist = localStorage.get('receiving');
								// if (persist) persist = JSON.parse(persist)
								// else persist = [];
								// persist.push(data);
								// localStorage.set('recieving', Json.stringify(persist));

								// setTimeout(() => {
								// 	navigate('/dashboards/institutions');
								// }, [6000]);
							}}
						>
							Save
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="primary"
							onClick={() => {
								setOpen(true);
								// setTimeout(() => {
								// 	navigate('/dashboards/institutions');
								// }, [6000]);
							}}
						>
							Submit to Next Stage
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
								// onClose={handleClose}
								severity="success"
								variant="filled"
								sx={{ width: '100%' }}
							>
								Application Saved Successfully
							</Alert>
						</Snackbar>
					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}

					>
						Add
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default ApplicationHeader;
