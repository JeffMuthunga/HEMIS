import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

/**
 * The contact info tab.
 */
function ContactInfoTab() {
	return (
		<div>
			<Controller
				name="email"
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
					/>
				)}
			/>

			<Controller
				name="mobileNo"
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Mobile No"
						autoFocus
						id="mobileNo"
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
