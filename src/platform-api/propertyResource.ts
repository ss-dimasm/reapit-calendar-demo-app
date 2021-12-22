import { ReapitConnectSession } from '@reapit/connect-session';

import {
  PropertyImageModelPagedResult,
  PropertyModel,
  PropertyModelPagedResult,
} from '@reapit/foundations-ts-definitions';

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

/**
 * Get property data by id
 */
export const getPropertyDataByPropertyId = async (
  session: ReapitConnectSession,
  propertyId
): Promise<PropertyModel | undefined> => {
  try {
    const response = await fetch(`${`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES.SINGLE}${propertyId}`}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<PropertyModel> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Properties Pages Result', err);
  }
};

export const getPropertyImagesByPropertyId = async (
  session: ReapitConnectSession,
  propertyId
): Promise<PropertyImageModelPagedResult | undefined> => {
  try {
    const response = await fetch(
      `${`${window.reapit.config.platformApiUrl}${URLS.PROPERTY_IMAGES.PAGED}?propertyId=${propertyId}`}`,
      {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response) {
      const responseJson: Promise<PropertyImageModelPagedResult> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Properties Pages Result', err);
  }
};
