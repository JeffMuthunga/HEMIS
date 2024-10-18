import GlobalStyles from '@mui/material/GlobalStyles';
import StudentsHeader from './StudentsHeader';
import StudentsTable from './StudentsTable';

/**
 * The products page.
 */
function Students() {
	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full flex flex-col px-16">
				<StudentsHeader />
				<StudentsTable />
			</div>
		</>
	);
}

export default Students;
