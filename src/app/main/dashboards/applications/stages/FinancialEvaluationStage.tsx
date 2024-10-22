import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	TextField,
	Slider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	Tooltip,
	LinearProgress,
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const financialCriteria = [
	{ id: 'revenue', name: 'Revenue Streams', description: 'Assess the diversity and sustainability of revenue sources.' },
	{ id: 'expenses', name: 'Expense Management', description: 'Evaluate the institution\'s ability to manage and control expenses.' },
	{ id: 'assets', name: 'Asset Management', description: 'Review the institution\'s assets and their utilization.' },
	{ id: 'liabilities', name: 'Liabilities and Debt', description: 'Assess the institution\'s debt levels and ability to meet financial obligations.' },
	{ id: 'sustainability', name: 'Financial Sustainability', description: 'Evaluate the long-term financial viability of the institution.' },
];

const financialRatios = [
	{ name: 'Current Ratio', value: 1.5, benchmark: 2 },
	{ name: 'Debt-to-Equity', value: 0.7, benchmark: 0.5 },
	{ name: 'Operating Margin', value: 0.08, benchmark: 0.1 },
	{ name: 'Return on Assets', value: 0.05, benchmark: 0.07 },
];

function FinancialEvaluationStage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [scores, setScores] = useState({});
	const [comments, setComments] = useState({});
	const [overallComments, setOverallComments] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleScoreChange = (criteriaId, newValue) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		setScores({ ...scores, [criteriaId]: newValue });
	};

	const handleCommentChange = (criteriaId, event) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

	const getOverallScore = () => {
		const totalScore: any = Object.values(scores).reduce((sum: number, score: number = 0) => sum + score, 0);
		return totalScore / financialCriteria.length;
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
							Financial Evaluation Stage
						</Typography>
						<div>
							<Typography className="text-15 sm:text-2xl truncate font-semibold">
								Namibia University of Science and Technology
							</Typography>
							<Typography className="text-15 sm:text-2xl truncate font-medium">
								Tracking No - <span className="text-red-900">NCHE/HEI/Reg/0004e</span>
							</Typography>
						</div>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant="h6" className="mb-16">Financial Ratios Overview</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={financialRatios}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<RechartsTooltip />
									<Bar dataKey="value" fill="#8884d8" name="Actual" />
									<Bar dataKey="benchmark" fill="#82ca9d" name="Benchmark" />
								</BarChart>
							</ResponsiveContainer>
						</Grid>
						{financialCriteria.map((criteria) => (
							<Grid item xs={12} key={criteria.id}>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`${criteria.id}-content`}
										id={`${criteria.id}-header`}
									>
										<Typography className="font-semibold">{criteria.name}</Typography>
										{scores[criteria.id] && (
											<Chip
												label={`${scores[criteria.id]}/100`}
												size="small"
												color={scores[criteria.id] >= 80 ? 'success' : scores[criteria.id] >= 60 ? 'warning' : 'error'}
												className="ml-auto mr-4"
											/>
										)}
									</AccordionSummary>
									<AccordionDetails>
										<Typography className="mb-16 text-gray-600">{criteria.description}</Typography>
										<div className="flex items-center mb-16">
											<Typography component="legend" className="mr-16">Score:</Typography>
											<Slider
												value={scores[criteria.id] || 0}
												onChange={(_, newValue) => handleScoreChange(criteria.id, newValue)}
												aria-labelledby={`${criteria.id}-slider`}
												valueLabelDisplay="auto"
												step={1}
												marks
												min={0}
												max={100}
												className="flex-grow"
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
								label="Overall Financial Assessment"
								variant="outlined"
								multiline
								rows={4}
								value={overallComments}
								onChange={(e) => setOverallComments(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} className="flex justify-between items-center">
							<Typography variant="h6">Overall Financial Score:</Typography>
							<Tooltip title={`${getOverallScore().toFixed(2)} out of 100`} arrow>
								<div className="w-1/2">
									<LinearProgress
										variant="determinate"
										value={getOverallScore()}
										color={getOverallScore() >= 80 ? 'success' : getOverallScore() >= 60 ? 'warning' : 'error'}
									/>
								</div>
							</Tooltip>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isSubmitting || Object.keys(scores).length !== financialCriteria.length}
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
										<span className="mx-8">Submit Financial Evaluation</span>
									</>
								)}
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={6000}
								onClose={handleClose}
								message="Financial evaluation submitted"
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
									Financial Evaluation Submitted Successfully
								</Alert>
							</Snackbar>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</LocalizationProvider>
	);
}

export default FinancialEvaluationStage;