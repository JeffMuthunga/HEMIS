import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import NotificationPanelToggleButton from 'src/app/main/apps/notifications/NotificationPanelToggleButton';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import { useAppSelector } from 'app/store/hooks';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NavigationSearch from '../../shared-components/navigation/NavigationSearch';
import UserMenu from '../../shared-components/UserMenu';
import QuickPanelToggleButton from '../../shared-components/quickPanel/QuickPanelToggleButton';
import Logo from '../../shared-components/Logo';
import { Layout3ConfigDefaultsType } from '../Layout3Config';

type ToolbarLayout3Props = {
	className?: string;
};

/**
 * The toolbar layout 3.
 */
function ToolbarLayout3(props: ToolbarLayout3Props) {
	const { className = '' } = props;
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as Layout3ConfigDefaultsType;
	const toolbarTheme = useAppSelector(selectToolbarTheme);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx('relative z-20 flex shadow-md', className)}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="container min-h-48 p-0 md:min-h-64 lg:px-24">
					<div className={clsx('flex shrink-0 items-center')}>
						{config.navbar.display && (
							<Hidden lgUp>
								<NavbarToggleButton className="mx-0 h-36 w-36 p-0 sm:mx-8" />
							</Hidden>
						)}
						<Hidden lgDown>
							<Logo />
						</Hidden>
					</div>

					<div className="flex flex-1">
						<Hidden smDown>
							<NavigationSearch
								className="mx-16 lg:mx-24"
								variant="basic"
							/>
						</Hidden>
					</div>

					<div className="flex items-center overflow-x-auto px-8 md:px-16 space-x-6">
						<Hidden smUp>
							<NavigationSearch />
						</Hidden>
						<LanguageSwitcher />
						<AdjustFontSize />
						<FullScreenToggle />
						<QuickPanelToggleButton />
						<NotificationPanelToggleButton />
						<Hidden lgDown>
							<UserMenu
								className="border border-solid"
								arrowIcon="heroicons-outline:chevron-down"
								popoverProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'center'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'center'
									}
								}}
							/>
						</Hidden>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout3);
