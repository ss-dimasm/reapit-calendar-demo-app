import { ReapitConnectSession } from '@reapit/connect-session';

import { NegotiatorModel, NegotiatorModelPagedResult } from '@reapit/foundations-ts-definitions';
import { URLS, BASE_HEADERS } from '../constants/api';

/**
 * Return list of properties
 * @default getAppointmentDateByNegotiatorId(session, 1, null)
 */

export const getAppointmentDateByNegotiatorId = async (
  session: ReapitConnectSession,
  negotiatorId
): Promise<NegotiatorModelPagedResult | undefined> => {
  try {
    const response = await fetch(
      `${`${window.reapit.config.platformApiUrl}${URLS.APPOINTMENT.PAGED}?sortBy=-start&negotiatorId=${negotiatorId}`}`,
      {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response) {
      const responseJson: Promise<NegotiatorModelPagedResult> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Appointment Date by Negotiator Id Result', err);
  }
};

/**
 * Get Negotiator Information by Id
 */
export const getNegotiatorDataByNegotiatorId = async (
  session: ReapitConnectSession,
  negotiatorId
): Promise<NegotiatorModel | undefined> => {
  try {
    const response = await fetch(
      `${`${window.reapit.config.platformApiUrl}${URLS.NEGOTIATOR.SINGLE}${negotiatorId}`}`,
      {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response) {
      const responseJson: Promise<NegotiatorModel> = response.json();
      return responseJson;
    }
    throw new Error('No response returned by API');
  } catch (err) {
    console.error('Error fetching Negotiator Data by Negotiator Id Result', err);
  }
};
