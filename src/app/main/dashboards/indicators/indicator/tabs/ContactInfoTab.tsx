import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The inventory tab.
 */
function ContactInfoTab() {
	const methods = useFormContext();
	const { control } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Email"
						autoFocus
						id="email"
						type="email"
						variant="outlined"
						fullWidth
						error={!!errors.email}
						helperText={errors?.email?.message as string}
						style={{ width: '50%' }}
					/>
				)}
			/>

			<Controller
				name="mobileNo"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="mobileNo"
						autoFocus
						id="mobileNo"
						type="number"
						variant="outlined"
						fullWidth
						error={!!errors.mobileNo}
						helperText={errors?.mobileNo?.message as string}
						style={{ width: '50%' }}
					/>
				)}
			/>
		</div>
	);
}

export default ContactInfoTab;
