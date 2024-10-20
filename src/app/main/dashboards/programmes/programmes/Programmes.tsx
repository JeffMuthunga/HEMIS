import GlobalStyles from '@mui/material/GlobalStyles';
import ProgrammesHeader from './ProgrammesHeader';
import ProgrammesTable from './ProgrammesTable';

/**
 * The products page.
 */
function Programmes() {
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
				<ProgrammesHeader />
				<ProgrammesTable />
			</div>
		</>
	);
}

export default Programmes;
