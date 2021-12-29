import React, { FC } from 'react';
import { useReapitConnect } from '@reapit/connect-session';
import { reapitConnectBrowserSession } from '../../core/connect-session';

import { NavResponsive } from '@reapit/elements';
import { useHistory } from 'react-router-dom';
export const Nav: FC = () => {
	const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession);

	const history = useHistory();
	return (
		<NavResponsive
			options={[
				{
					itemIndex: 0,
				},
				{
					itemIndex: 1,
					href: 'google.com',
					iconId: 'appsMenu',
					text: 'Apps',
				},
				{
					itemIndex: 2,
					href: '/company',
					callback: () => history.push('/company'),
					iconId: 'dataMenu',
					text: 'Company',
				},
				{
					itemIndex: 4,
					callback: () => history.push('/calendar'),
					href: '/calendar',
					iconId: 'mapMenu',
					text: 'AppointIn',
				},
				{
					itemIndex: 5,
					href: '/negotiator',
					callback: () => history.push('/negotiator'),
					iconId: 'usersMenu',
					text: 'Negotiator',
				},
				{
					itemIndex: 6,
					callback: connectLogoutRedirect,
					isSecondary: true,
					iconId: 'logoutMenu',
					text: 'Logout',
				},
			]}
		/>
	);
};

export default Nav;
