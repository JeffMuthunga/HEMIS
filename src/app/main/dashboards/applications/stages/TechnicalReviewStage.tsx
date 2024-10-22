import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	TextField,
	Rating,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	Tooltip,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const reviewCriteria = [
	{ id: 'curriculum', name: 'Curriculum Design', description: 'Assess the structure, content, and relevance of the proposed curriculum.' },
	{ id: 'faculty', name: 'Faculty Qualifications', description: 'Evaluate the qualifications and experience of the teaching staff.' },
	{ id: 'facilities', name: 'Learning Facilities', description: 'Review the adequacy and quality of classrooms, laboratories, and libraries.' },
	{ id: 'technology', name: 'Technology Infrastructure', description: 'Assess the IT infrastructure, including hardware and software resources.' },
	{ id: 'research', name: 'Research Capabilities', description: 'Evaluate the institution\'s research facilities and output potential.' },
];

function TechnicalReviewStage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [ratings, setRatings] = useState({});
	const [comments, setComments] = useState({});
	const [overallComments, setOverallComments] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleRatingChange = (criteriaId, newValue) => {
		setRatings({ ...ratings, [criteriaId]: newValue });
	};

	const handleCommentChange = (criteriaId, event) => {
		setComments({ ...comments, [criteriaId]: event.target.value });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setOpen(true);
		}, 2000);
	};

	const getOverallRating = () => {
		const totalRating: any = Object.values(ratings).reduce((sum: number, rating: number) => sum + rating, 0);
		return totalRating / reviewCriteria.length;
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
			<div className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<div>
						<PageBreadcrumb className="mb-8" />
						<Typography className="text-4xl font-extrabold leading-none tracking-tight">
							Technical Review Stage
						</Typography>
						<div>
							<Typography className="text-15 sm:text-2xl truncate font-semibold">
								Namibia University of Science and Technology
							</Typography>
							<Typography className="text-15 sm:text-2xl truncate font-medium">
								Tracking No - <span className="text-red-900">NCHE/HEI/Reg/0003d</span>
							</Typography>
						</div>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						{reviewCriteria.map((criteria) => (
							<Grid item xs={12} key={criteria.id}>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`${criteria.id}-content`}
										id={`${criteria.id}-header`}
									>
										<Typography className="font-semibold">{criteria.name}</Typography>
										{ratings[criteria.id] && (
											<Chip
												label={`${ratings[criteria.id]}/5`}
												size="small"
												color={ratings[criteria.id] >= 4 ? 'success' : ratings[criteria.id] >= 3 ? 'warning' : 'error'}
												className="ml-auto mr-4"
											/>
										)}
									</AccordionSummary>
									<AccordionDetails>
										<Typography className="mb-16 text-gray-600">{criteria.description}</Typography>
										<div className="flex items-center mb-16">
											<Typography component="legend" className="mr-16">Rating:</Typography>
											<Rating
												name={`rating-${criteria.id}`}
												value={ratings[criteria.id] || 0}
												onChange={(event, newValue) => handleRatingChange(criteria.id, newValue)}
											/>
										</div>
										<TextField
											fullWidth
											label="Comments"
											variant="outlined"
											multiline
											rows={3}
											value={comments[criteria.id] || ''}
											onChange={(e) => handleCommentChange(criteria.id, e)}
										/>
									</AccordionDetails>
								</Accordion>
							</Grid>
						))}
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Overall Comments"
								variant="outlined"
								multiline
								rows={4}
								value={overallComments}
								onChange={(e) => setOverallComments(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} className="flex justify-between items-center">
							<Typography variant="h6">Overall Rating:</Typography>
							<Tooltip title={`${getOverallRating().toFixed(2)} out of 5`} arrow>
								<div>
									<Rating
										name="overall-rating"
										value={getOverallRating()}
										readOnly
										precision={0.1}
									/>
								</div>
							</Tooltip>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isSubmitting || Object.keys(ratings).length !== reviewCriteria.length}
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
										<span className="mx-8">Submit Technical Review</span>
									</>
								)}
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={6000}
								// onClose={handleClose}
								message="Technical review submitted"
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
									Technical Review Submitted Successfully
								</Alert>
							</Snackbar>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</LocalizationProvider>
	);
}

export default TechnicalReviewStage;