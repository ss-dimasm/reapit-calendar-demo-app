import { ReapitConnectSession } from '@reapit/connect-session';

import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions';

import { URLS, BASE_HEADERS } from '../constants/api';

/**
 * Return list of properties
 * @default getListingsOfProperties(session, 1, null)
 */

export const getListingsOfProperties = async (
  session: ReapitConnectSession,
  propertyData
): Promise<PropertyModelPagedResult | undefined> => {
  const { pageNumber, address } = propertyData;
  try {
    const response = await fetch(
      `${`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES.PAGED}?pageNumber=${pageNumber}&address=${address}`}`,
      {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response) {
      const responseJson: Promise<PropertyModelPagedResult> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Properties Pages Result', err);
  }
};
