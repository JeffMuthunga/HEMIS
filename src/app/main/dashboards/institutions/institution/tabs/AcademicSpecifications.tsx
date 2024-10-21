import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';


/**
 * The pricing tab.
 */
function AcademicSpecifications() {
	const { control } = useFormContext();
	const departments = ['Physics', 'Chemistry', 'History'];

	return (
		<div>
			<Controller
				name="qualification_code"
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Qualification Code"
						autoFocus
						id="qualification_code"
						variant="outlined"
						fullWidth
						value='Bsc01'
					/>
				)}
			/>

			<Controller
				name="faculty"
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="faculty"
						autoFocus
						id="faculty"
						value="STEM"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="department"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={departments} // Options to show in the dropdown
						getOptionLabel={(option) => option}
						onChange={(_, value) => field.onChange(value)} // Handle value change
						renderInput={(params) => (
							<TextField
								{...params}
								label="Department"
								variant="outlined"
								required
							/>
						)}
					/>
				)}
			/>
		</div>
	);
}

export default AcademicSpecifications;
