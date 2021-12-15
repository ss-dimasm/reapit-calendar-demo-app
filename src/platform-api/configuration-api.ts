import { ReapitConnectSession } from '@reapit/connect-session';
import {
  CompanyModelPagedResult,
  ListItemModel,
  PropertyImageModel,
  PropertyImageModelPagedResult,
  PropertyModel,
  PropertyModelPagedResult,
} from '@reapit/foundations-ts-definitions';

import { URLS, BASE_HEADERS } from '../constants/api';

export const configurationAppointmentsApiService = async (
  session: ReapitConnectSession
): Promise<Array<ListItemModel> | undefined> => {
  try {
    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.CONFIGURATION_APPOINTMENT_TYPES}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<ListItemModel[]> = response.json();
      return responseJson;
    }

    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err);
  }
};

/**
 * Properties Configuration
 */
export const configurationPropertiesApiService = async (
  session: ReapitConnectSession
): Promise<PropertyModelPagedResult | undefined> => {
  try {
    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.CONFIGURATION_PROPERTIES_LIST}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<PropertyModelPagedResult> = response.json();
      return responseJson;
    }

    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Properties List', err);
  }
};

/**
 * Property Detail appear on modal
 */
/**
 * Properties Configuration
 */
export const configurationPropertyDetailApiService = async (
  session: ReapitConnectSession,
  idProperty: string | undefined
): Promise<PropertyModel | undefined> => {
  try {
    const response = await fetch(
      `${window.reapit.config.platformApiUrl}${URLS.CONFIGURATION_PROPERTIES_LIST}${idProperty}`,
      {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response) {
      const responseJson: Promise<PropertyModel> = response.json();

      return responseJson;
    }

    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Property Model Details', err);
  }
};

/**
 * Get all properties images result
 * @param session
 * @param idProperty
 * @returns
 */
export const configurationPropertiesImagesApiService = async (
  session: ReapitConnectSession
): Promise<PropertyImageModelPagedResult | undefined> => {
  try {
    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.CONFIGURATION_PROPERTY_IMAGES}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<PropertyImageModelPagedResult> = response.json();
      return responseJson;
    }

    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Property Model Details', err);
  }
};

/**
 * Get Property Image result
 * @param session
 * @param idProperty
 * @returns
 */
export const configurationPropertyImagesApiService = async (
  session: ReapitConnectSession,
  uriParams: string | undefined
): Promise<PropertyImageModel | undefined> => {
  try {
    const response = await fetch(`${window.reapit.config.platformApiUrl}${uriParams}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<PropertyImageModel> = response.json();
      return responseJson;
    }

    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Property Model Details', err);
  }
};

/**
 * Get all resource from Company
 */
export const configurationCompaniesApiServices = async (
  session: ReapitConnectSession,
  page?: number
): Promise<CompanyModelPagedResult | undefined> => {
  let fixUri: string;

  if (page === undefined) {
    fixUri = `${window.reapit.config.platformApiUrl}${URLS.COMPANIES.ALL}`;
  } else {
    fixUri = `${window.reapit.config.platformApiUrl}${page}`;
  }

  try {
    const response = await fetch(`${fixUri}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response) {
      const responseJson: Promise<CompanyModelPagedResult> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Companies Pages Result', err);
  }
};
