import GlobalStyles from '@mui/material/GlobalStyles';
import IndicatorsHeader from './IndicatorsHeader';
import IndicatorsTable from './IndicatorsTable';

/**
 * The products page.
 */
function Indicators() {
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
				<IndicatorsHeader />
				<IndicatorsTable />
			</div>
		</>
	);
}

export default Indicators;
