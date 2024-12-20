import FuseExample from '@fuse/core/FuseExample';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import SimpleMapComponent from './examples/SimpleMap';
import SimpleMapRaw from './examples/SimpleMap.tsx?raw';

/**
 * GoogleMapReact Doc
 * This document provides information on how to use GoogleMapReact.
 */
function GoogleMapReactDoc() {
	return (
		<>
			<div className="flex w-full items-center justify-between mb-24">
				<Typography variant="h4">GoogleMapReact</Typography>
				<Button
					variant="contained"
					color="secondary"
					component="a"
					href="https://github.com/google-map-react/google-map-react"
					target="_blank"
					role="button"
					startIcon={<FuseSvgIcon>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
				>
					Reference
				</Button>
			</div>
			<Typography
				className="mb-16"
				component="p"
			>
				<code>google-map-react</code> is a component written over a small set of the Google Maps API.
			</Typography>

			<hr />

			<Typography
				className="text-5xl mt-32 mb-8"
				component="h2"
			>
				Example Usages
			</Typography>
			<FuseExample
				className="mb-64"
				component={SimpleMapComponent}
				raw={SimpleMapRaw}
			/>

			<Typography
				className="text-5xl mt-32 mb-8"
				component="h2"
			>
				Demos
			</Typography>

			<ul>
				<li className="mb-8">
					<Link to="/dashboards/analytics">Analytics Dashboard</Link>
				</li>
			</ul>
		</>
	);
}

export default GoogleMapReactDoc;
