import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The inventory tab.
 */
function ContactInfoTab() {
	const methods = useFormContext();
	const { control } = methods;

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
						value='joseph.mwita@softclans.co.ke'
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
						value="0746260004"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default ContactInfoTab;
