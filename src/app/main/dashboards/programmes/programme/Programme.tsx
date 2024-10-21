import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProgrammeModel from './models/ProgrammeModel';

/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('You must enter a product name').min(5, 'The product name must be at least 5 characters')
});

/**
 * The product page.
 */
function Programme() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();

	const { productId } = routeParams;

	// const {
	// 	data: product,
	// 	isLoading,
	// 	isError
	// } = useGetIndicatorQuery(productId, {
	// 	skip: !productId || productId === 'new'
	// });

	const [tabValue, setTabValue] = useState('basic-info');

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;

	const form = watch();

	useEffect(() => {
		if (productId === 'new') {
			reset(ProgrammeModel({}));
		}
	}, [productId, reset]);

	// useEffect(() => {
	// 	if (product) {
	// 		reset({ ...product });
	// 	}
	// }, [product, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: string) {
		setTabValue(value);
	}

	// if (isLoading) {
	// 	return <FuseLoading />;
	// }

	/**
	 * Show Message if the requested products is not exists
	 */
	// if (isError && productId !== 'new') {
	// 	return (
	// 		<motion.div
	// 			initial={{ opacity: 0 }}
	// 			animate={{ opacity: 1, transition: { delay: 0.1 } }}
	// 			className="flex flex-col flex-1 items-center justify-center h-full"
	// 		>
	// 			<Typography
	// 				color="text.secondary"
	// 				variant="h5"
	// 			>
	// 				There is no such product!
	// 			</Typography>
	// 			<Button
	// 				className="mt-24"
	// 				component={Link}
	// 				variant="outlined"
	// 				to="/apps/e-commerce/products"
	// 				color="inherit"
	// 			>
	// 				Go to Indicators Page
	// 			</Button>
	// 		</motion.div>
	// 	);
	// }

	/**
	 * Wait while product data is loading and form is setted
	 */
	// if (_.isEmpty(form) || (product && routeParams.productId !== product.id && routeParams.productId !== 'new')) {
	// 	return <FuseLoading />;
	// }

	// return (
	// 	<FormProvider >
	// 		<FusePageCarded
	// 			header={<ProgrammeHeader />}
	// 			content={
	// 				<div className="p-16 sm:p-24 max-w-3xl space-y-24">
	// 					<FuseTabs
	// 						value={tabValue}
	// 						onChange={handleTabChange}
	// 					>
	// 						<FuseTab
	// 							value="basic-info"
	// 							label="Basic Info"
	// 						/>
	// 						<FuseTab
	// 							value="product-images"
	// 							label="Indicator Image and Docs"
	// 						/>
	// 						<FuseTab
	// 							value="pricing"
	// 							label="Pricing"
	// 						/>
	// 						<FuseTab
	// 							value="contact-info"
	// 							label="Contact Info"
	// 						/>
	// 						<FuseTab
	// 							value="shipping"
	// 							label="Shipping"
	// 						/>
	// 					</FuseTabs>
	// 					<div className="">
	// 						<div className={tabValue !== 'basic-info' ? 'hidden' : ''}>
	// 							<BasicInfoTab />
	// 						</div>
	//
	// 						<div className={tabValue !== 'product-images' ? 'hidden' : ''}>
	// 							<ProductImagesTab />
	// 						</div>
	//
	// 						<div className={tabValue !== 'pricing' ? 'hidden' : ''}>
	// 							<PricingTab />
	// 						</div>
	//
	// 						<div className={tabValue !== 'contact-info' ? 'hidden' : ''}>
	// 							<ContactInfoTab />
	// 						</div>
	//
	// 						<div className={tabValue !== 'shipping' ? 'hidden' : ''}>
	// 							<ShippingTab />
	// 						</div>
	// 					</div>
	// 				</div>
	// 			}
	// 			scroll={isMobile ? 'normal' : 'content'}
	// 		/>
	// 	</FormProvider>
	// );
}

export default Programme;
