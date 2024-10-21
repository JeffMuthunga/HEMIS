import React, { useState } from 'react';

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
		<div className="batch-management">
			<header className="header">
				<h1>Batch Management for {heiName}</h1>
				<p>Logged in as: {currentUser}</p>
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
					<button className="add-batch">Add New Batch</button>
					<table className="batch-table">
						<thead>
						<tr>
							<th>Batch ID</th>
							<th>Batch Name</th>
							<th>Program</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Status</th>
							<th>Actions</th>
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
									<button onClick={() => setSelectedBatch(batch)}>View</button>
									<button>Edit</button>
									<button>Delete</button>
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

			<style jsx>{`
        .batch-management {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f0f0f0;
          padding: 10px;
          margin-bottom: 20px;
        }
        .batch-overview {
          margin-bottom: 20px;
        }
        .filters {
          margin-bottom: 10px;
        }
        .filters input, .filters select {
          margin-right: 10px;
        }
        .batch-table {
          width: 100%;
          border-collapse: collapse;
        }
        .batch-table th, .batch-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .batch-table th {
          background-color: #f2f2f2;
        }
        .batch-details, .add-batch-form {
          background-color: #f9f9f9;
          padding: 20px;
          border: 1px solid #ddd;
        }
        .add-batch-form form {
          display: flex;
          flex-direction: column;
        }
        .add-batch-form label {
          margin-bottom: 10px;
        }
        button {
          cursor: pointer;
          padding: 5px 10px;
          margin-right: 5px;
        }
      `}</style>
		</div>
	);
}