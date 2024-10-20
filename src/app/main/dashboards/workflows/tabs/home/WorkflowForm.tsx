import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

// Fake Toaster Notification Component
const FakeToaster = ({ message }) => {
	return (
		<div className="fixed top-16 right-16 bg-green-500 text-white p-4 rounded shadow-lg">
			{message}
		</div>
	);
};

function WorkflowForm({ initialValues }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialValues);
	const [toasterMessage, setToasterMessage] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();

		// Here you can send the form data to the backend (e.g., via an API request)
		console.log('Form Data:', formData);

		// Show fake toaster notification
		setToasterMessage('Workflow added successfully!');

		// Navigate back to the previous route after a short delay
		setTimeout(() => {
			navigate(-1); // Go back to the previous route
		}, 2000); // Show the toaster for 2 seconds
	};

	// Pre-fill values when initialValues prop changes
	useEffect(() => {
		setFormData(initialValues);
	}, [initialValues]);

	return (
		<div>
			{toasterMessage && <FakeToaster message={toasterMessage} />}
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-8">
				<TextField
					label="Workflow Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					fullWidth
					variant="outlined"
				/>

				<TextField
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					multiline
					rows={4}
					fullWidth
					variant="outlined"
				/>

				<TextField
					select
					label="Status"
					name="status"
					value={formData.status}
					onChange={handleChange}
					fullWidth
					variant="outlined"
					required
				>
					<MenuItem value="active">Active</MenuItem>
					<MenuItem value="inactive">Inactive</MenuItem>
				</TextField>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					startIcon={<FuseSvgIcon size={20}>heroicons-outline:check-circle</FuseSvgIcon>}
				>
					Add Workflow
				</Button>
			</form>
		</div>
	);
}

export default WorkflowForm;
