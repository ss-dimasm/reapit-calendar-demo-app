import axios from 'axios';
import { ReapitConnectSession } from '@reapit/connect-session';

import { AppointmentModelPagedResult } from '@reapit/foundations-ts-definitions';

import { URLS, BASE_HEADERS } from '../constants/api';
import { CreateAppointmentModelType } from '../interfaces/appointmentInterfaces';

/**
 * Return list of properties
 * @default getListingsOfProperties(session, 1, null)
 */

export const getListOfAppointmentsByPropertyId = async (
	session: ReapitConnectSession,
	propertyId
): Promise<AppointmentModelPagedResult | undefined> => {
	try {
		const response = await fetch(
			`${`${window.reapit.config.platformApiUrl}${URLS.APPOINTMENT.PAGED}?propertyId=${propertyId}`}`,
			{
				method: 'GET',
				headers: {
					...BASE_HEADERS,
					Authorization: `Bearer ${session.accessToken}`,
				},
			}
		);

		if (response) {
			const responseJson: Promise<AppointmentModelPagedResult> = response.json();
			return responseJson;
		}
		throw new Error('No response returned by API');
	} catch (err) {
		console.error('Error fetching Properties Pages Result', err);
	}
};

export const postNewAppointment = async (
	session: ReapitConnectSession,
	appointmentData: CreateAppointmentModelType
): Promise<any> => {
	const requestData = JSON.stringify(appointmentData);
	return axios
		.post(`${window.reapit.config.platformApiUrl}${URLS.APPOINTMENT.PAGED}/`, requestData, {
			headers: {
				...BASE_HEADERS,
				Authorization: `Bearer ${session.accessToken}`,
			},
		})
		.catch((err) => console.error(err));
};
