import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import StudentHeader from './StudentHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import ContactInfoTab from './tabs/ContactInfoTab';
import AcademicSpecifications from './tabs/AcademicSpecifications';
import ProductImagesTab from './tabs/ProductImagesTab';
import DemographicsTab from './tabs/DemographicsTab';
import { useGetStudentQuery } from '../StudentsApi';
import StudentModel from './models/StudentModel';

/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('You must enter a product name').min(5, 'The product name must be at least 5 characters')
});

/**
 * The student page component.
 */
function Student() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { studentId } = routeParams;

	// Fetching student data
	const { data: student, isLoading, isError } = useGetStudentQuery(studentId, {
		skip: !studentId || studentId === 'new'
	});

	const [tabValue, setTabValue] = useState('basic-info');

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset } = methods;

	// Initializing form data for a new or existing student
	useEffect(() => {
		if (studentId === 'new') {
			reset(StudentModel({}));
		}
	}, [studentId, reset]);

	useEffect(() => {
		if (student) {
			reset({ ...student });
		}
	}, [student, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: string) {
		setTabValue(value);
	}

	/**
	 * Show message if the requested student doesn't exist
	 */
	if (isError && studentId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="text.secondary" variant="h5">
					There is no such student!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/students"
					color="inherit"
				>
					Go to Students Page
				</Button>
			</motion.div>
		);
	}

	// Loading spinner while data is being fetched
	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<StudentHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-3xl space-y-24">
						<FuseTabs value={tabValue} onChange={handleTabChange}>
							<FuseTab value="basic-info" label="Basic Info" />
							<FuseTab value="contact-info" label="Contact Info" />
							<FuseTab value="academic" label="Academic Specifications" />
							<FuseTab value="product-images" label="Student Image and Docs" />
							<FuseTab value="demographics" label="Demographics" />
						</FuseTabs>
						<div className="">
							{tabValue === 'basic-info' && <BasicInfoTab />}
							{tabValue === 'product-images' && <ProductImagesTab />}
							{tabValue === 'academic' && <AcademicSpecifications />}
							{tabValue === 'contact-info' && <ContactInfoTab />}
							{tabValue === 'demographics' && <DemographicsTab />}
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Student;
