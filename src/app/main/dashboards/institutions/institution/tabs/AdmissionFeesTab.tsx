import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';

/**
 * The admissions and fees tab.
 */
function AdmissionsFeesTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	// Options for mode of learning
	const modesOfLearning = ['In-person', 'Online', 'Hybrid'];

	return (
		<div>
			{/* Admission Requirements */}
			<Controller
				name="admissionRequirements"
				control={control}
				defaultValue="Entry exams (SAT/ACT), Minimum GPA of 3.0" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Admission Requirements"
						id="admissionRequirements"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						error={!!errors.admissionRequirements}
						helperText={errors?.admissionRequirements?.message as string}
					/>
				)}
			/>

			{/* Annual Tuition Fees */}
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Controller
						name="annualTuitionFeesDomestic"
						control={control}
						defaultValue="N$ 150,000" // Prefilled value
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								required
								label="Annual Tuition Fees (Domestic Students)"
								id="annualTuitionFeesDomestic"
								variant="outlined"
								fullWidth
								error={!!errors.annualTuitionFeesDomestic}
								helperText={errors?.annualTuitionFeesDomestic?.message as string}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name="annualTuitionFeesInternational"
						control={control}
						defaultValue="N$ 300,000" // Prefilled value
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								required
								label="Annual Tuition Fees (International Students)"
								id="annualTuitionFeesInternational"
								variant="outlined"
								fullWidth
								error={!!errors.annualTuitionFeesInternational}
								helperText={errors?.annualTuitionFeesInternational?.message as string}
							/>
						)}
					/>
				</Grid>
			</Grid>

			{/* Mode of Learning */}
			<Controller
				name="modeOfLearning"
				control={control}
				defaultValue="Hybrid" // Prefilled value
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={modesOfLearning} // Options for modes of learning
						getOptionLabel={(option) => option} // Function to extract label from option
						onChange={(_, value) => field.onChange(value)} // Handle value change
						renderInput={(params) => (
							<TextField
								{...params}
								label="Mode of Learning"
								variant="outlined"
								className="mt-8 mb-16"
								required
							/>
						)}
					/>
				)}
			/>
		</div>
	);
}

export default AdmissionsFeesTab;
