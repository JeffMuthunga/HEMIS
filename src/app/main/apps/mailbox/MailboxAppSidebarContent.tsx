import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseNavigation from '@fuse/core/FuseNavigation';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import MailCompose from './MailCompose';
import { useGetMailboxFiltersQuery, useGetMailboxFoldersQuery, useGetMailboxLabelsQuery } from './MailboxApi';

/**
 * The mailbox app sidebar content.
 */
function MailboxAppSidebarContent() {
	const { data: folders } = useGetMailboxFoldersQuery();
	const { data: labels } = useGetMailboxLabelsQuery();
	const { data: filters } = useGetMailboxFiltersQuery();

	const { t } = useTranslation('mailboxApp');

	return (
		<div className="flex-auto border-l-1">
			<div className="mb-24 mt-40 mx-24">
				<PageBreadcrumb
					maxItems={3}
					className="mb-8"
				/>

				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<Typography className="text-4xl font-extrabold tracking-tight leading-none">Mailbox</Typography>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.1 } }}
				>
					<MailCompose className="mt-24" />
				</motion.div>
			</div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-md font-600"
					color="secondary.main"
				>
					{t('FOLDERS')}
				</Typography>

				<FuseNavigation
					navigation={folders?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/${item.slug}`
					}))}
				/>
			</motion.div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-md font-600"
					color="secondary.main"
				>
					{t('FILTERS')}
				</Typography>

				<FuseNavigation
					navigation={filters?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/filter/${item.slug}`
					}))}
				/>
			</motion.div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-md font-600"
					color="secondary.main"
				>
					{t('LABELS')}
				</Typography>

				<FuseNavigation
					navigation={labels?.map((item) =>
						FuseNavItemModel({
							...item,
							type: 'item',
							url: `/apps/mailbox/label/${item.slug}`,
							icon: 'heroicons-outline:tag',
							sx: {
								'& > .fuse-list-item-icon': {
									color: `${item.color}!important`,
									opacity: 0.6
								}
							}
						})
					)}
				/>
			</motion.div>
		</div>
	);
}

export default MailboxAppSidebarContent;
