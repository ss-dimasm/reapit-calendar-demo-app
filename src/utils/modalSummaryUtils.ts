import moment from 'moment';
import {
	NegotiatorDataType,
	PropertyDataType,
	CreateAppointmentModelType,
	UserInfoType,
} from '../interfaces/appointmentInterfaces';

/**
 * Get new time format from DDMMYYTHHMMSS to DDMMYYYY HMM
 */
export const convertTimeToAssignedInput = (date: Date): string => {
	return date.toISOString().substring(0, 16);
};

/**
 * Get Coordinate location (lat, long) based Single Property Data
 * @param PropertyDataType
 */
export const identityLocationCoordinate = (propertyData: PropertyDataType): string => {
	const latitude = propertyData?.address?.geolocation?.latitude;
	const longitude = propertyData?.address?.geolocation?.longitude;

	const coordinate = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
	return coordinate;
};

/**
 * Specific Negotiator Data from negotiatorDataById Resource
 * @param negotiatorData
 * @returns NegotiatorDataType
 */
export const identityNegotiator = (negotiatorData: NegotiatorDataType) => {
	const identity = {
		name: negotiatorData?.name ?? 'Anonymous',
		email: negotiatorData?.email ?? '-',
		phone: negotiatorData?.mobilePhone ?? '-',
		photo:
			negotiatorData?.profileImageUrl ??
			'https://png.pngitem.com/pimgs/s/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
	};

	return identity;
};

/**
 * Wrap Address of Single Property Data
 * @param {PropertyDataType}  PropertyData
 */
export const identityTheAddress = (propertyData: PropertyDataType): string => {
	const buildingName = propertyData?.address?.buildingName ?? '';
	const buildingNumber = propertyData?.address?.buildingNumber ?? '';

	const address1 = `${propertyData?.address?.line1}, ` ?? '';
	const address2 = `${propertyData?.address?.line2}, ` ?? '';
	const address3 = `${propertyData?.address?.line3}` ?? '';

	const finalAddress = `${buildingName} ${buildingNumber} - ${address1}${address2}${address3}`;
	return finalAddress;
};

/**
 * Generate post data based pattern that already provided in docs
 * @see https://developers.reapit.cloud/swagger
 * @param appointmentDateData
 * @param propertyData
 * @param negotiatorData
 */
const generateAppointmentPostData = (
	appointmentDateData,
	propertyData,
	negotiatorData,
	userInfoData: UserInfoType
): CreateAppointmentModelType => {
	const data: any = {
		start: appointmentDateData?.start.toISOString(),
		end: appointmentDateData?.end.toISOString(),
		followUpOn: moment(new Date(appointmentDateData?.end)).add(1, 'd').toISOString().substring(0, 10),
		typeId: 'VW',
		description: appointmentDateData?.title,
		organiserId: negotiatorData?.id,
		negotiatorIds: [propertyData?.negotiatorId],
		officeIds: propertyData?.officeIds,
		attendee: {
			contact: [
				{
					name: userInfoData?.name,
					phone: userInfoData?.phone,
					mail: userInfoData?.email,
				},
			],
			id: 'MKT210196',
			type: 'applicant',
		},
		propertyId: propertyData?.id,
		accompanied: true,
		negotiatorConfirmed: true,
		attendeeConfirmed: true,
		propertyConfirmed: true,
		virtual: false,
		recurrence: undefined,
	};

	return data;
};

/**
 * Debug Output Data from Appointment that already made
 * @param appointmentDateData
 * @param propertyData
 * @param negotiatorData
 */
export const consoleDotLogThenPostToBackend = (
	appointmentDateData,
	propertyData,
	negotiatorData,
	userInfoData
): void => {
	const data = generateAppointmentPostData(appointmentDateData, propertyData, negotiatorData, userInfoData);
	console.log(data);
};

/**
 * Retrieve Appointment Data that already made from step 1 until final step
 * @param appointmentDateData
 * @param propertyData
 * @param negotiatorData
 */
export const retrieveAppointmentDataPostModel = (
	appointmentDateData,
	propertyData,
	negotiatorData,
	userInfoData
): CreateAppointmentModelType => {
	const data = generateAppointmentPostData(appointmentDateData, propertyData, negotiatorData, userInfoData);
	return data;
};
