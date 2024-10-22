// import TextField from '@mui/material/TextField';
// import { Controller, useFormContext } from 'react-hook-form';
//
// /**
//  * The basic info tab.
//  */
// function BasicInfoTab() {
// 	const methods = useFormContext();
// 	const { control, formState } = methods;
// 	const { errors } = formState;
//
// 	return (
// 		<div>
// 			<Controller
// 				name="name"
// 				control={control}
// 				render={({ field }) => (
// 					<TextField
// 						{...field}
// 						className="mt-8 mb-16"
// 						required
// 						label="Name"
// 						autoFocus
// 						id="name"
// 						variant="outlined"
// 						fullWidth
// 						error={!!errors.name}
// 						helperText={errors?.name?.message as string}
// 						style={{ width: '50%' }}
// 					/>
// 				)}
// 			/>
//
// 			<Controller
// 				name="surname"
// 				control={control}
// 				render={({ field }) => (
// 					<TextField
// 						{...field}
// 						className="mt-8 mb-16"
// 						required
// 						label="Surname"
// 						autoFocus
// 						id="surname"
// 						variant="outlined"
// 						fullWidth
// 						error={!!errors.surname}
// 						helperText={errors?.surname?.message as string}
// 						style={{ width: '50%' }}
// 					/>
// 				)}
// 			/>
// 			<Controller
// 				name="dateOfBirth"
// 				control={control}
// 				render={({ field }) => (
// 					<TextField
// 						{...field}
// 						className="mt-8 mb-16"
// 						required
// 						label="dateOfBirth"
// 						type="number"
// 						autoFocus
// 						id="dateOfBirth"
// 						variant="outlined"
// 						fullWidth
// 						error={!!errors.dateOfBirth}
// 						helperText={errors?.dateOfBirth?.message as string}
// 						style={{ width: '50%' }}
// 					/>
// 				)}
// 			/>
//
// 			<Controller
// 				name="sex"
// 				control={control}
// 				render={({ field }) => (
// 					<TextField
// 						{...field}
// 						className="mt-8 mb-16"
// 						required
// 						label="Sex"
// 						autoFocus
// 						id="sex"
// 						variant="outlined"
// 						fullWidth
// 						error={!!errors.sex}
// 						helperText={errors?.sex?.message as string}
// 						style={{ width: '50%' }}
// 					/>
// 				)}
// 			/>
// 		</div>
// 	);
// }
//
// export default BasicInfoTab;
