import GlobalStyles from '@mui/material/GlobalStyles';
import InstitutionsHeader from './InstitutionsHeader';
import InstitutionsTable from './InstitutionsTable';

/**
 * The products page.
 */
function Institutions() {
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
				{/*<InstitutionsHeader />*/}
				<InstitutionsTable />
			</div>
		</>
	);
}

export default Institutions;
