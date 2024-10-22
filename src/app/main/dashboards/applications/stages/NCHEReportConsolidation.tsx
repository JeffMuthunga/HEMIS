import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Stepper,
	Step,
	StepLabel,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListItemIcon
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
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const recommendationTypes = [
	{ value: 'full_accreditation', label: 'Full Accreditation', color: '#4caf50' },
	{ value: 'provisional_accreditation', label: 'Provisional Accreditation', color: '#ff9800' },
	{ value: 'denial', label: 'Denial of Accreditation', color: '#f44336' },
	{ value: 'deferral', label: 'Deferral for Further Review', color: '#2196f3' },
];

const evaluationData = [
	{ category: 'Document Verification', score: 85 },
	{ category: 'Technical Review', score: 78 },
	{ category: 'Financial Evaluation', score: 92 },
	{ category: 'Infrastructure Assessment', score: 70 },
	{ category: 'Academic Programs', score: 88 },
];

const reportSections = [
	'Executive Summary',
	'Institutional Overview',
	'Academic Programs',
	'Faculty and Staff',
	'Student Services',
	'Facilities and Resources',
	'Financial Stability',
	'Governance and Administration',
];

function NCHEReportConsolidation() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [recommendation, setRecommendation] = useState('');
	const [decisionDate, setDecisionDate] = useState<Date | null>(null);
	const [executiveSummary, setExecutiveSummary] = useState('');
	const [strengths, setStrengths] = useState('');
	const [weaknesses, setWeaknesses] = useState('');
	const [conditions, setConditions] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setOpen(true);
		}, 2000);
	};

	const getRecommendationColor = () => {
		const type = recommendationTypes.find(t => t.value === recommendation);
		return type ? type.color : '#000';
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
							NCHE Report Consolidation and Recommendation
						</Typography>
						<div>
							<Typography className="text-15 sm:text-2xl truncate font-semibold">
								Namibia University of Science and Technology
							</Typography>
							<Typography className="text-15 sm:text-2xl truncate font-medium">
								Tracking No - <span className="text-red-900">NCHE/HEI/Reg/0006g</span>
							</Typography>
						</div>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<Stepper activeStep={activeStep} className="mb-36">
					<Step>
						<StepLabel>Review Reports</StepLabel>
					</Step>
					<Step>
						<StepLabel>Consolidate Findings</StepLabel>
					</Step>
					<Step>
						<StepLabel>Prepare Recommendation</StepLabel>
					</Step>
				</Stepper>

				<form onSubmit={handleSubmit}>
					{activeStep === 0 && (
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<Card>
									<CardContent>
										<Typography variant="h6" className="mb-16">Evaluation Summary</Typography>
										<ResponsiveContainer width="100%" height={300}>
											<RadarChart data={evaluationData}>
												<PolarGrid />
												<PolarAngleAxis dataKey="category" />
												<PolarRadiusAxis angle={30} domain={[0, 100]} />
												<Radar name="Institution Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
												<Legend />
											</RadarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6}>
								<Card>
									<CardContent>
										<Typography variant="h6" className="mb-16">Report Sections</Typography>
										<List>
											{reportSections.map((section, index) => (
												<ListItem key={index}>
													<ListItemIcon>
														<FuseSvgIcon>heroicons-outline:document-text</FuseSvgIcon>
													</ListItemIcon>
													<ListItemText primary={section} />
												</ListItem>
											))}
										</List>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					)}

					{activeStep === 1 && (
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Executive Summary"
									variant="outlined"
									multiline
									rows={6}
									value={executiveSummary}
									onChange={(e) => setExecutiveSummary(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									fullWidth
									label="Institutional Strengths"
									variant="outlined"
									multiline
									rows={4}
									value={strengths}
									onChange={(e) => setStrengths(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									fullWidth
									label="Areas for Improvement"
									variant="outlined"
									multiline
									rows={4}
									value={weaknesses}
									onChange={(e) => setWeaknesses(e.target.value)}
									required
								/>
							</Grid>
						</Grid>
					)}

					{activeStep === 2 && (
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<FormControl fullWidth>
									<InputLabel id="recommendation-type-label">Recommendation</InputLabel>
									<Select
										labelId="recommendation-type-label"
										value={recommendation}
										onChange={(e) => setRecommendation(e.target.value)}
										label="Recommendation"
										required
									>
										{recommendationTypes.map((type) => (
											<MenuItem key={type.value} value={type.value}>
												{type.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6}>
								<DatePicker
									label="Decision Date"
									value={decisionDate}
									onChange={(newValue) => setDecisionDate(newValue)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Conditions or Recommendations"
									variant="outlined"
									multiline
									rows={4}
									value={conditions}
									onChange={(e) => setConditions(e.target.value)}
								/>
							</Grid>
						</Grid>
					)}

					<Box className="mt-32 flex justify-between">
						<Button
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							Back
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={activeStep === 2 ? handleSubmit : handleNext}
							disabled={isSubmitting}
							style={activeStep === 2 ? { backgroundColor: getRecommendationColor() } : {}}
						>
							{activeStep === 2 ? (
								isSubmitting ? (
									<CircularProgress size={24} />
								) : (
									'Submit Recommendation'
								)
							) : (
								'Next'
							)}
						</Button>
					</Box>
				</form>

				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message="Recommendation submitted"
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
						NCHE Recommendation Submitted Successfully
					</Alert>
				</Snackbar>
			</Paper>
		</LocalizationProvider>
	);
}

export default NCHEReportConsolidation;