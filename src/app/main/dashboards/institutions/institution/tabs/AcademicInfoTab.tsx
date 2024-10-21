import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

/**
 * The academic info tab.
 */
function AcademicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			{/* Key Programs Offered */}
			<Controller
				name="keyProgramsOffered"
				control={control}
				defaultValue="Computer Science, Business Administration, Engineering" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Key Programs Offered"
						id="keyProgramsOffered"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						error={!!errors.keyProgramsOffered}
						helperText={errors?.keyProgramsOffered?.message as string}
					/>
				)}
			/>

			{/* Degree Levels Offered */}
			<Controller
				name="degreeLevelsOffered"
				control={control}
				defaultValue="Undergraduate, Graduate, PhD" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Degree Levels Offered"
						id="degreeLevelsOffered"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						error={!!errors.degreeLevelsOffered}
						helperText={errors?.degreeLevelsOffered?.message as string}
					/>
				)}
			/>

			{/* Student-to-Teacher Ratio */}
			<Controller
				name="studentToTeacherRatio"
				control={control}
				defaultValue="15:1" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Student-to-Teacher Ratio"
						id="studentToTeacherRatio"
						variant="outlined"
						fullWidth
						error={!!errors.studentToTeacherRatio}
						helperText={errors?.studentToTeacherRatio?.message as string}
					/>
				)}
			/>

			{/* Faculty Information */}
			<Controller
				name="facultyInformation"
				control={control}
				defaultValue="150 faculty members with PhD qualifications" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Faculty Information"
						id="facultyInformation"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						error={!!errors.facultyInformation}
						helperText={errors?.facultyInformation?.message as string}
					/>
				)}
			/>

			{/* Research Output */}
			<Controller
				name="researchOutput"
				control={control}
				defaultValue="200 papers published annually, 5 research centers" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Research Output"
						id="researchOutput"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						error={!!errors.researchOutput}
						helperText={errors?.researchOutput?.message as string}
					/>
				)}
			/>

			{/* International Student Percentage */}
			<Controller
				name="internationalStudentPercentage"
				control={control}
				defaultValue="25%" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="International Student Percentage"
						type="number"
						id="internationalStudentPercentage"
						variant="outlined"
						fullWidth
						error={!!errors.internationalStudentPercentage}
						helperText={errors?.internationalStudentPercentage?.message as string}
					/>
				)}
			/>
		</div>
	);
}

export default AcademicInfoTab;
