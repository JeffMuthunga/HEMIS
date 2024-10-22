import React, { useState } from 'react';
import {
	Button,
	Typography,
	Paper,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Menu,
	MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import { Stage, Layer, Rect, Text, Arrow, Group } from 'react-konva';

interface WorkflowStage {
	id: string;
	name: string;
	x: number;
	y: number;
}

interface Transition {
	from: string;
	to: string;
}

const initialStages: WorkflowStage[] = [
	{ id: 'receiving', name: 'Receiving', x: 50, y: 50 },
	{ id: 'payment_verification', name: 'Payment Verification', x: 250, y: 50 },
	{ id: 'document_verification', name: 'Document Verification', x: 450, y: 50 },
	{ id: 'technical_review', name: 'Technical Review', x: 50, y: 150 },
	{ id: 'financial_evaluation', name: 'Financial Evaluation', x: 250, y: 150 },
	{ id: 'notification_to_applicant', name: 'Notification to Applicant', x: 450, y: 150 },
	{ id: 'nche_report_consolidation', name: 'NCHE Report Consolidation', x: 250, y: 250 },
];

const initialTransitions: Transition[] = [
	{ from: 'receiving', to: 'payment_verification' },
	{ from: 'payment_verification', to: 'document_verification' },
	{ from: 'document_verification', to: 'technical_review' },
	{ from: 'technical_review', to: 'financial_evaluation' },
	{ from: 'financial_evaluation', to: 'notification_to_applicant' },
	{ from: 'notification_to_applicant', to: 'nche_report_consolidation' },
];

function HEIRegistrationWorkflow() {
	const [stages, setStages] = useState<WorkflowStage[]>(initialStages);
	const [transitions, setTransitions] = useState<Transition[]>(initialTransitions);
	const [isAddStageDialogOpen, setIsAddStageDialogOpen] = useState(false);
	const [newStageName, setNewStageName] = useState('');
	const [isAddTransitionDialogOpen, setIsAddTransitionDialogOpen] = useState(false);
	const [newTransition, setNewTransition] = useState<Transition>({ from: '', to: '' });
	const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number; } | null>(null);
	const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);

	const handleAddStage = () => {
		if (newStageName) {
			const newStage: WorkflowStage = {
				id: newStageName.toLowerCase().replace(/\s+/g, '_'),
				name: newStageName,
				x: Math.random() * 400 + 50,
				y: Math.random() * 200 + 50,
			};
			setStages([...stages, newStage]);
			setNewStageName('');
			setIsAddStageDialogOpen(false);
		}
	};

	const handleAddTransition = () => {
		if (newTransition.from && newTransition.to) {
			setTransitions([...transitions, newTransition]);
			setNewTransition({ from: '', to: '' });
			setIsAddTransitionDialogOpen(false);
		}
	};

	const handleContextMenu = (event: React.MouseEvent, stage: WorkflowStage) => {
		event.preventDefault();
		setSelectedStage(stage);
		setContextMenu(
			contextMenu === null
				? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
				: null,
		);
	};

	const handleCloseContextMenu = () => {
		setContextMenu(null);
	};

	const handleDeleteStage = () => {
		if (selectedStage) {
			setStages(stages.filter(stage => stage.id !== selectedStage.id));
			setTransitions(transitions.filter(t => t.from !== selectedStage.id && t.to !== selectedStage.id));
		}
		handleCloseContextMenu();
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<div>
						<PageBreadcrumb className="mb-8" />
						<Typography className="text-4xl font-extrabold leading-none tracking-tight">
							HEI Registration Workflow
						</Typography>
					</div>
				</motion.span>
			</div>

			<Paper className="flex flex-col flex-auto shadow-1 rounded-lg overflow-hidden p-24 md:p-32">
				<Box className="flex justify-end space-x-2 mb-4">
					<Button
						variant="contained"
						color="primary"
						startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
						onClick={() => setIsAddStageDialogOpen(true)}
					>
						Add Stage
					</Button>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<FuseSvgIcon>heroicons-outline:arrow-right</FuseSvgIcon>}
						onClick={() => setIsAddTransitionDialogOpen(true)}
					>
						Add Transition
					</Button>
				</Box>

				<Box className="border border-gray-300 rounded-lg" style={{ height: '600px' }}>
					<Stage width={800} height={600}>
						<Layer>
							{transitions.map((transition, index) => {
								const fromStage = stages.find(s => s.id === transition.from);
								const toStage = stages.find(s => s.id === transition.to);
								if (fromStage && toStage) {
									return (
										<Arrow
											key={index}
											points={[fromStage.x + 75, fromStage.y + 25, toStage.x, toStage.y + 25]}
											pointerLength={10}
											pointerWidth={10}
											fill="black"
											stroke="black"
										/>
									);
								}
								return null;
							})}
							{stages.map((stage) => (
								<Group
									key={stage.id}
									x={stage.x}
									y={stage.y}
									draggable
									onDragEnd={(e) => {
										const updatedStages = stages.map(s =>
											s.id === stage.id ? { ...s, x: e.target.x(), y: e.target.y() } : s
										);
										setStages(updatedStages);
									}}
									onContextMenu={(e) => handleContextMenu(e.evt as unknown as React.MouseEvent, stage)}
								>
									<Rect
										width={150}
										height={50}
										fill="#4CAF50"
										cornerRadius={5}
										shadowColor="black"
										shadowBlur={10}
										shadowOpacity={0.2}
										shadowOffsetX={5}
										shadowOffsetY={5}
									/>
									<Text
										text={stage.name}
										width={150}
										height={50}
										align="center"
										verticalAlign="middle"
										fill="white"
										fontSize={14}
									/>
								</Group>
							))}
						</Layer>
					</Stage>
				</Box>
			</Paper>

			<Dialog open={isAddStageDialogOpen} onClose={() => setIsAddStageDialogOpen(false)}>
				<DialogTitle>Add New Stage</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Stage Name"
						fullWidth
						variant="outlined"
						value={newStageName}
						onChange={(e) => setNewStageName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsAddStageDialogOpen(false)}>Cancel</Button>
					<Button onClick={handleAddStage} color="primary">Add</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={isAddTransitionDialogOpen} onClose={() => setIsAddTransitionDialogOpen(false)}>
				<DialogTitle>Add New Transition</DialogTitle>
				<DialogContent>
					<TextField
						select
						margin="dense"
						label="From Stage"
						fullWidth
						variant="outlined"
						value={newTransition.from}
						onChange={(e) => setNewTransition({ ...newTransition, from: e.target.value })}
					>
						{stages.map((stage) => (
							<MenuItem key={stage.id} value={stage.id}>{stage.name}</MenuItem>
						))}
					</TextField>
					<TextField
						select
						margin="dense"
						label="To Stage"
						fullWidth
						variant="outlined"
						value={newTransition.to}
						onChange={(e) => setNewTransition({ ...newTransition, to: e.target.value })}
					>
						{stages.map((stage) => (
							<MenuItem key={stage.id} value={stage.id}>{stage.name}</MenuItem>
						))}
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsAddTransitionDialogOpen(false)}>Cancel</Button>
					<Button onClick={handleAddTransition} color="primary">Add</Button>
				</DialogActions>
			</Dialog>

			<Menu
				open={contextMenu !== null}
				onClose={handleCloseContextMenu}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? { top: contextMenu.mouseY, left: contextMenu.mouseX }
						: undefined
				}
			>
				<MenuItem onClick={handleDeleteStage}>Delete Stage</MenuItem>
			</Menu>
		</div>
	);
}

export default HEIRegistrationWorkflow;