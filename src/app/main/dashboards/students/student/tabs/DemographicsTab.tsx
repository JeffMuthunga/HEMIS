import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

/**
 * The demographics tab for handling disability type, funding source, and marginalized status.
 */
function DemographicsTab() {
	const { control } = useFormContext();
	const disabilityTypes = ['None', 'Visual', 'Hearing', 'Mobility', 'Cognitive']; // Options for disability types
	const fundingSources = ['Government', 'Private', 'NGO', 'Self-Funded']; // Options for funding sources

	return (
		<div>
			{/* Type of Disability Autocomplete */}
			<Controller
				name="disability_type"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={disabilityTypes} // Options for disability types
						getOptionLabel={(option) => option} // Function to extract label from option
						onChange={(_, value) => field.onChange(value)} // Handle value change
						renderInput={(params) => (
							<TextField
								{...params}
								label="Type of Disability"
								variant="outlined"
								className="mt-8 mb-16"
								required
							/>
						)}
					/>
				)}
			/>

			{/* Source of Funding Autocomplete */}
			<Controller
				name="source_of_funding"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={fundingSources} // Options for funding sources
						getOptionLabel={(option) => option} // Function to extract label from option
						onChange={(_, value) => field.onChange(value)} // Handle value change
						renderInput={(params) => (
							<TextField
								{...params}
								label="Source of Funding"
								variant="outlined"
								className="mt-8 mb-16"
								required
							/>
						)}
					/>
				)}
			/>

			{/* Marginalized Radio Buttons */}
			<Controller
				name="marginalized"
				control={control}
				render={({ field }) => (
					<RadioGroup {...field} row>
						<Typography
							className=''
						>Is student marginalized?</Typography>
						<FormControlLabel
							value="yes"
							className="mt-8 mb-16"
							control={<Radio />}
							label="Yes"
						/>
						<FormControlLabel
							value="no"
							className="mt-8 mb-16"
							control={<Radio />}
							label="No"
						/>
					</RadioGroup>
				)}
			/>
		</div>
	);
}

export default DemographicsTab;