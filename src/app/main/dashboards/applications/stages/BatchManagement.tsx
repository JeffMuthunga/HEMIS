import React, { useState } from 'react';
import './BatchManagement.module.css'
interface Batch {
	id: string;
	name: string;
	program: string;
	startDate: string;
	endDate: string;
	status: 'Active' | 'Completed' | 'Cancelled';
	capacity: number;
	currentEnrollment: number;
}

interface BatchManagementProps {
	heiName: string;
	currentUser: string;
}

export default function BatchManagement({ heiName, currentUser }: BatchManagementProps) {
	const [batches, setBatches] = useState<Batch[]>([
		{
			id: '1',
			name: 'Batch 2023A',
			program: 'Engineering',
			startDate: '2023-01-01',
			endDate: '2023-12-31',
			status: 'Active',
			capacity: 100,
			currentEnrollment: 80,
		},
		{
			id: '2',
			name: 'Batch 2023B',
			program: 'Law',
			startDate: '2023-06-01',
			endDate: '2024-05-31',
			status: 'Active',
			capacity: 50,
			currentEnrollment: 45,
		},
	]);

	const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

	return (
		<div className="container-fluid ml-5 mr-5 mt-1 p-5 batch-management">
			<header className="header p-5">
				<h1 className="p-2">Batch Management for {heiName}</h1>
				<p className="p-2">Logged in as: {currentUser}</p>
			</header>

			<main>
				<section className="batch-overview">
					<h2>Batch Overview</h2>
					<div className="filters">
						<input type="text" placeholder="Search batches" />
						<select>
							<option value="">All Statuses</option>
							<option value="Active">Active</option>
							<option value="Completed">Completed</option>
							<option value="Cancelled">Cancelled</option>
						</select>
						<select>
							<option value="">All Programs</option>
							<option value="Engineering">Engineering</option>
							<option value="Law">Law</option>
						</select>
					</div>
					<button className="add-batch btn btn-info">Add New Batch</button>
					<button className="add-batch btn btn-secondary">Download Template</button>
					<table className="table table-striped table-hover ">
						<thead>
						<tr>
							<th scope="col">Batch ID</th>
							<th scope="col">Batch Name</th>
							<th scope="col">Program</th>
							<th scope="col">Start Date</th>
							<th scope="col">End Date</th>
							<th scope="col">Status</th>
							<th scope="col" >Actions</th>
						</tr>
						</thead>
						<tbody>
						{batches.map((batch) => (
							<tr key={batch.id}>
								<td>{batch.id}</td>
								<td>{batch.name}</td>
								<td>{batch.program}</td>
								<td>{batch.startDate}</td>
								<td>{batch.endDate}</td>
								<td>{batch.status}</td>
								<td>
									<button className="btn btn-info" onClick={() => setSelectedBatch(batch)}>View</button>
									<button className="btn btn-secondary">Edit</button>
									<button className="btn btn-danger">Delete</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</section>

				{selectedBatch && (
					<section className="batch-details">
						<h2>Batch Details</h2>
						<p><strong>Batch ID:</strong> {selectedBatch.id}</p>
						<p><strong>Batch Name:</strong> {selectedBatch.name}</p>
						<p><strong>Program:</strong> {selectedBatch.program}</p>
						<p><strong>Start Date:</strong> {selectedBatch.startDate}</p>
						<p><strong>End Date:</strong> {selectedBatch.endDate}</p>
						<p><strong>Status:</strong> {selectedBatch.status}</p>
						<p><strong>Capacity:</strong> {selectedBatch.capacity}</p>
						<p><strong>Current Enrollment:</strong> {selectedBatch.currentEnrollment}</p>
						<button>Edit Batch</button>
					</section>
				)}

				<section className="add-batch-form" style={{ display: 'none' }}>
					<h2>Add New Batch</h2>
					<form>
						<label>
							Batch Name:
							<input type="text" name="batchName" />
						</label>
						<label>
							Program:
							<select name="program">
								<option value="Engineering">Engineering</option>
								<option value="Law">Law</option>
							</select>
						</label>
						<label>
							Start Date:
							<input type="date" name="startDate" />
						</label>
						<label>
							End Date:
							<input type="date" name="endDate" />
						</label>
						<label>
							Capacity:
							<input type="number" name="capacity" />
						</label>
						<label>
							Status:
							<select name="status">
								<option value="Active">Active</option>
								<option value="Completed">Completed</option>
								<option value="Cancelled">Cancelled</option>
							</select>
						</label>
						<button type="submit">Add Batch</button>
					</form>
				</section>
			</main>

		</div>
	);
}