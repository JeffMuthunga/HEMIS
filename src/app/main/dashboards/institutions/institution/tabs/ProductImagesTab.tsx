import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
	'& .productImageFeaturedStar': {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0,
	},

	'& .productImageUpload': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
	},

	'& .productImageItem': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& .productImageFeaturedStar': {
				opacity: 0.8,
			},
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& .productImageFeaturedStar': {
				opacity: 1,
			},
			'&:hover .productImageFeaturedStar': {
				opacity: 1,
			},
		},
	},
}));

/**
 * The product images tab.
 */
function ProductImagesTab() {
	const methods = useFormContext();
	const { control, watch } = methods;

	const images = [
		{
			id: '0',
			url: 'assets/images/apps/ecommerce/a-walk-amongst-friends.jpg',
			type: 'image',
		},
		{
			id: '1',
			url: 'assets/images/apps/ecommerce/braies-lake.jpg',
			type: 'image',
		},
		{
			id: '2',
			url: 'assets/images/apps/ecommerce/fall-glow.jpg',
			type: 'image',
		},
		{
			id: '3',
			url: 'assets/images/apps/ecommerce/first-snow.jpg',
			type: 'image',
		},
	];

	return (
		<Root>
			<div className="flex justify-center sm:justify-start flex-wrap -mx-12">
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Box
							sx={{
								backgroundColor: (theme) =>
									theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.2)
										: lighten(theme.palette.background.default, 0.02),
							}}
							component="label"
							htmlFor="button-file"
							className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-lg mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
						>
							<input
								accept="image/*,.pdf"
								className="hidden"
								id="button-file"
								type="file"
								onChange={async (e) => {
									function readFileAsync() {
										return new Promise((resolve, reject) => {
											const file = e?.target?.files?.[0];

											if (!file) {
												return;
											}

											const reader = new FileReader();

											if (file.type.includes('image')) {
												reader.onload = () => {
													resolve({
														id: FuseUtils.generateGUID(),
														url: `data:${file.type};base64,${btoa(reader.result as string)}`,
														type: 'image',
													});
												};
												reader.readAsBinaryString(file);
											} else if (file.type.includes('pdf')) {
												reader.onload = () => {
													resolve({
														id: FuseUtils.generateGUID(),
														url: `data:${file.type};base64,${btoa(reader.result as string)}`,
														type: 'pdf',
													});
												};
												reader.readAsBinaryString(file);
											}

											reader.onerror = reject;
										});
									}

									const newFile = await readFileAsync();
									onChange([newFile, ...(value as EcommerceProduct['images'])]);
								}}
							/>
							<FuseSvgIcon size={32} color="action">
								heroicons-outline:arrow-up-on-square
							</FuseSvgIcon>
						</Box>
					)}
				/>

				<Controller
					name="featuredImageId"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => {
						return (
							<>
								{images.map((media) => (
									<Box
										sx={{
											backgroundColor: (theme) =>
												theme.palette.mode === 'light'
													? lighten(theme.palette.background.default, 0.2)
													: lighten(theme.palette.background.default, 0.02),
										}}
										onClick={() => onChange(media.id)}
										onKeyDown={() => onChange(media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											'productImageItem flex items-center justify-center relative w-128 h-128 rounded-lg mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
											media.id === value && 'featured'
										)}
										key={media.id}
									>
										<FuseSvgIcon className="productImageFeaturedStar">
											heroicons-solid:star
										</FuseSvgIcon>
										<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
									</Box>
								))}
							</>
						);
					}}
				/>

				{/* Display Uploaded Documents */}
				<Controller
					name="documents"
					control={control}
					render={({ field: { value } }) => (
						<Box className="flex flex-wrap">
							{(value || []).map((doc) => (
								<Box
									key={doc.id}
									sx={{
										backgroundColor: (theme) =>
											theme.palette.mode === 'light'
												? lighten(theme.palette.background.default, 0.2)
												: lighten(theme.palette.background.default, 0.02),
									}}
									className="w-128 h-64 mx-12 mb-24 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg"
								>
									<Typography variant="body2" component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										{doc.type === 'pdf' ? 'PDF Document' : 'Document'} - {doc.id}
									</Typography>
									<a href={doc.url} target="_blank" rel="noopener noreferrer">
										<FuseSvgIcon className="ml-4" size={20} color="action">
											heroicons-outline:document-text
										</FuseSvgIcon>
									</a>
								</Box>
							))}
						</Box>
					)}
				/>
			</div>
		</Root>
	);
}

export default ProductImagesTab;
