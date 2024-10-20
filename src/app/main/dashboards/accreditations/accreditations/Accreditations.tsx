import GlobalStyles from '@mui/material/GlobalStyles';
import AccreditationsHeader from './AccreditationsHeader';
import AccreditationsTable from './AccreditationsTable';

/**
 * The products page.
 */
function Accreditations() {
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
				<AccreditationsHeader />
				<AccreditationsTable />
			</div>
		</>
	);
}

export default Accreditations;
