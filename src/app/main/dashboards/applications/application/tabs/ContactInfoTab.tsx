import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The contact info tab.
 */
function ContactInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			{/* Contact Details */}
			<Controller
				name="contactDetails"
				control={control}
				defaultValue="1234 University Ave, Windhoek, Namibia" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Contact Details"
						id="contactDetails"
						variant="outlined"
						fullWidth
						error={!!errors.contactDetails}
						helperText={errors?.contactDetails?.message as string}
					/>
				)}
			/>

			{/* Email Address */}
			<Controller
				name="email"
				control={control}
				defaultValue="joseph.mwita@softclans.co.ke" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Email"
						type="email"
						id="email"
						variant="outlined"
						fullWidth
						error={!!errors.email}
						helperText={errors?.email?.message as string}
					/>
				)}
			/>

			{/* Mobile Number */}
			<Controller
				name="mobileNo"
				control={control}
				defaultValue="0746260004" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Mobile Number"
						type="tel" // Changed to 'tel' for mobile number input
						id="mobileNo"
						variant="outlined"
						fullWidth
						error={!!errors.mobileNo}
						helperText={errors?.mobileNo?.message as string}
					/>
				)}
			/>

			<Controller
				name="website"
				control={control}
				defaultValue="info@universityofnamibia.co.na" // Prefilled value
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Website"
						type="email"
						id="email"
						variant="outlined"
						fullWidth
						error={!!errors.email}
						helperText={errors?.email?.message as string}
					/>
				)}
			/>
		</div>
	);
}

export default ContactInfoTab;
