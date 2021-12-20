import React, { FC } from 'react';
import { useReapitConnect } from '@reapit/connect-session';
import { reapitConnectBrowserSession } from '../../core/connect-session';

import { NavResponsive } from '@reapit/elements';

export const Nav: FC = () => {
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession);

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
          iconId: 'dataMenu',
          text: 'Company',
        },
        {
          itemIndex: 4,
          href: '/calendar',
          iconId: 'mapMenu',
          text: 'AppointIn',
        },
        {
          itemIndex: 5,
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
