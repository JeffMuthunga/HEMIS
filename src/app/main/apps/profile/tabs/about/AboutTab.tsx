import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetProfileAboutQuery } from '../../ProfileApi';

/**
 * The about tab.
 */
function AboutTab() {
	const { data: profile, isLoading } = useGetProfileAboutQuery();
    
	console.log(profile);

	if (isLoading) {
		return <FuseLoading />;
	}

	const { studentinfo } = profile;

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="w-full"
		>
			<div className="md:flex">
				<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
					<Card
						component={motion.div}
						variants={item}
						className="w-full mb-32"
					>
						<div className="px-32 pt-24">
							<Typography className="text-2xl font-semibold leading-tight">
								Student Information
							</Typography>
						</div>

						<CardContent className="px-32 py-24">
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Sex</Typography>
								<Typography>{studentinfo.sex}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Date of Birth</Typography>
								<Typography>{studentinfo.dateofbirth}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Students Address</Typography>

								{studentinfo.address.map((location) => (
									<div
										className="flex items-center"
										key={location}
									>
										<Typography>{location}</Typography>
									</div>
								))}
							</div>

							<div className="mb-24">

								<Typography className="font-semibold mb-4 text-lg">Academic Year</Typography>
								<Typography>{studentinfo.academicYear}</Typography>
							</div>
                            <div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Student Identification</Typography>
								<Typography>{studentinfo.studentId}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Email address</Typography>
								<Typography>{studentinfo.emailAddress}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Contact Number</Typography>
								<Typography>{studentinfo.contactNumber}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Qualification Code</Typography>
								<Typography>{studentinfo.qualificationCode}</Typography>
							</div>
                            <div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">Faculty</Typography>
								<Typography>{studentinfo.faculty}</Typography>
							</div>
                            <div className="mb-24">
								<Typography className="font-semibold mb-4 text-lg">About Me</Typography>
								<Typography>{studentinfo.about}</Typography>
							</div>

						</CardContent>
					</Card>
				</div>
			</div>
		</motion.div>
	);
}

export default AboutTab;
