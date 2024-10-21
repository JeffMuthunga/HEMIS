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
import InstitutionHeader from './InstitutionHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import ContactInfoTab from './tabs/ContactInfoTab';
import AcademicSpecifications from './tabs/AcademicSpecifications';
import ProductImagesTab from './tabs/ProductImagesTab';
import DemographicsTab from './tabs/DemographicsTab';
import { useGetInstitutionQuery } from '../InstitutionsApi';
import InstitutionModel from './models/InstitutionModel';
import AcademicInfoTab from './tabs/AcademicInfoTab';
import AdmissionsFeesTab from './tabs/AdmissionFeesTab';

/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('You must enter a product name').min(5, 'The product name must be at least 5 characters')
});

/**
 * The institution page component.
 */
function Institution() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { institutionId } = routeParams;

	// Fetching institution data
	const { data: institution, isLoading, isError } = useGetInstitutionQuery(institutionId, {
		skip: !institutionId || institutionId === 'new'
	});

	const [tabValue, setTabValue] = useState('basic-info');

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset } = methods;

	// Initializing form data for a new or existing institution
	useEffect(() => {
		if (institutionId === 'new') {
			reset(InstitutionModel({}));
		}
	}, [institutionId, reset]);

	useEffect(() => {
		if (institution) {
			reset({ ...institution });
		}
	}, [institution, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: string) {
		setTabValue(value);
	}

	/**
	 * Show message if the requested institution doesn't exist
	 */
	if (isError && institutionId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="text.secondary" variant="h5">
					There is no such institution!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/institutions"
					color="inherit"
				>
					Go to Institutions Page
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
				header={<InstitutionHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-3xl space-y-24">
						<FuseTabs value={tabValue} onChange={handleTabChange}>
							<FuseTab value="basic-info" label="Basic Info" />
							<FuseTab value="contact-info" label="Contact Info" />
							<FuseTab value="academic-info" label="Academic Info"/>
							<FuseTab value='admissions-info' label="Admissions Info" />
							<FuseTab value="product-images" label="Institution Image and Docs" />
						</FuseTabs>
						<div className="">
							{tabValue === 'basic-info' && <BasicInfoTab />}
							{tabValue === 'product-images' && <ProductImagesTab />}
							{tabValue === 'academic' && <AcademicSpecifications />}
							{tabValue === 'contact-info' && <ContactInfoTab />}
							{tabValue === 'academic-info' && <AcademicInfoTab />}
							{tabValue === 'admissions-info' && <AdmissionsFeesTab />}

						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Institution;
