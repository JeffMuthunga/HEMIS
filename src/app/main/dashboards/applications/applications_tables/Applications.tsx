import GlobalStyles from '@mui/material/GlobalStyles';
import ApplicationsHeader from './ApplicationsHeader';
import ApplicationsTable from './ApplicationsTable';

/**
 * The products page.
 */
function Applications() {
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
				<ApplicationsTable />
			</div>
		</>
	);
}

export default Applications;
