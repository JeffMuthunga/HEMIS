import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center space-x-8">
			<img
				className="logo-icon h-32 w-32"
				src="assets/images/logo/hemis1.png"
				alt="logo"
			/>
			<div className="logo-text flex space-x-8 items-center">
				<Typography className="text-2xl tracking-light font-semibold">HEMIS</Typography>
				<Box
					className="badge flex items-center rounded space-x-6 px-8 py-4"
					sx={{
						backgroundColor: '#23272f',
						color: '#82d7f7'
					}}
				>
					<img
						className="react-badge"
						src="assets/images/logo/browser.svg"
						alt="core"
						width="16"
					/>
					<span className="react-text text-md font-semibold">Core</span>
				</Box>
			</div>
		</Root>
	);
}

export default Logo;
