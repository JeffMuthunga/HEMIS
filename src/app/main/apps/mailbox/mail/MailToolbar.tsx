import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Tooltip from '@mui/material/Tooltip';
import MailActionsMenu from './MailActionsMenu';
import MailLabelsMenu from './MailLabelsMenu';
import { useApplyMailboxMailActionMutation, useGetMailboxMailQuery } from '../MailboxApi';

/**
 * The mail toolbar.
 */
function MailToolbar() {
	const { mailId } = useParams() as { mailId: string };
	const { data: mail } = useGetMailboxMailQuery(mailId);

	const [setActionToMails] = useApplyMailboxMailActionMutation();

	const theme = useTheme();
	const navigate = useNavigate();

	function handleGoBack() {
		navigate(-1);
	}

	if (!mail) {
		return null;
	}

	return (
		<Box
			sx={{ backgroundColor: 'background.default' }}
			className="flex items-center justify-between w-full min-h-64 px-8 border-b"
		>
			<IconButton
				onClick={handleGoBack}
				className="lg:hidden md:-mx-4"
			>
				<FuseSvgIcon>
					{theme.direction === 'ltr'
						? 'heroicons-outline:arrow-small-left'
						: 'heroicons-outline:arrow-small-right'}
				</FuseSvgIcon>
			</IconButton>

			<div className="flex flex-1 justify-end items-center">
				<MailLabelsMenu
					labels={mail.labels}
					onChange={(value) => {
						setActionToMails({ type: 'labels', value, ids: [mail.id] });
					}}
					className="mx-2"
				/>

				<Tooltip title="Set important">
					<IconButton
						className="mx-2"
						onClick={() => setActionToMails({ type: 'important', value: !mail.important, ids: [mail.id] })}
					>
						<FuseSvgIcon className={clsx(mail.important && 'text-red-600 dark:text-red-500')}>
							heroicons-outline:exclamation-circle
						</FuseSvgIcon>
					</IconButton>
				</Tooltip>

				<Tooltip title="Set starred">
					<IconButton
						className="mx-2"
						onClick={() => setActionToMails({ type: 'starred', value: !mail.starred, ids: [mail.id] })}
					>
						<FuseSvgIcon className={clsx(mail.starred && 'text-orange-500 dark:text-red-400')}>
							heroicons-outline:star
						</FuseSvgIcon>
					</IconButton>
				</Tooltip>

				<MailActionsMenu className="mx-4" />
			</div>
		</Box>
	);
}

export default MailToolbar;
