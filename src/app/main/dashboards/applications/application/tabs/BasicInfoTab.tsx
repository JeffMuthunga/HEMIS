import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	// Options for designation and type of institution
	const designations = ["University", "College", "Institute", "Academy"];
	const institutionTypes = ["Public", "Private", "Non-Profit"];

	return (
		<div>
			<Controller
				name="heiName"
				control={control}
				defaultValue="Example Higher Education Institute" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="HEI Name"
						id="heiName"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			{/* Designation ComboBox */}
			<Controller
				name="institutionalDesignation"
				control={control}
				defaultValue={designations[0]} // Prefilled value
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={designations}
						getOptionLabel={(option) => option}
						onChange={(_, value) => field.onChange(value)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Institutional Designation"
								className="mt-8 mb-16"
								required
								variant="outlined"
							/>
						)}
					/>
				)}
			/>

			{/* Type of Institution ComboBox */}
			<Controller
				name="typeOfInstitution"
				control={control}
				defaultValue={institutionTypes[0]} // Prefilled value
				render={({ field }) => (
					<Autocomplete
						{...field}
						options={institutionTypes}
						getOptionLabel={(option) => option}
						onChange={(_, value) => field.onChange(value)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Type of Institution (Public/Private)"
								className="mt-8 mb-16"
								required
								variant="outlined"
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="yearOfEstablishment"
				control={control}
				defaultValue="2000" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Year of Establishment"
						type="number"
						id="yearOfEstablishment"
						variant="outlined"
						fullWidth
						error={!!errors.yearOfEstablishment}
						helperText={errors?.yearOfEstablishment?.message as string}
					/>
				)}
			/>

			<Controller
				name="numberOfStudents"
				control={control}
				defaultValue="1500" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Number of Students"
						type="number"
						id="numberOfStudents"
						variant="outlined"
						fullWidth
						error={!!errors.numberOfStudents}
						helperText={errors?.numberOfStudents?.message as string}
					/>
				)}
			/>

			<Controller
				name="location"
				control={control}
				defaultValue="Windhoek, Namibia" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Location"
						id="location"
						variant="outlined"
						fullWidth
						error={!!errors.location}
						helperText={errors?.location?.message as string}
					/>
				)}
			/>

			<Controller
				name="accreditationStatus"
				control={control}
				defaultValue="Accredited by ABC Body" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Accreditation Status"
						id="accreditationStatus"
						variant="outlined"
						fullWidth
						error={!!errors.accreditationStatus}
						helperText={errors?.accreditationStatus?.message as string}
					/>
				)}
			/>

			<Controller
				name="institutionalGovernance"
				control={control}
				defaultValue="Chancellor, Vice-Chancellor" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Institutional Governance"
						id="institutionalGovernance"
						variant="outlined"
						fullWidth
						error={!!errors.institutionalGovernance}
						helperText={errors?.institutionalGovernance?.message as string}
					/>
				)}
			/>

		</div>
	);
}

export default BasicInfoTab;
