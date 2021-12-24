import { PropertyDataType, NegotiatorDataType } from '../components/ui/appoInt/SubTableAppointment';
/**
 * Get new time format from DDMMYYTHHMMSS to DDMMYYYY HMM
 */
export const convertTimeToAssignedInput = (date: Date): string => {
  console.log(date.toISOString().substring(0, 16));
  console.log(date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  // issue here
  return date.toISOString().substring(0, 16);
};

/**
 * Get Coordinate location (lat, long) based Single Property Data
 * @param {PropertyDataType} propertyData
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

export const consoleDotLogThenPostToBackend = (
  appointmentDateData,
  propertyData,
  negotiatorData,
  userInfoData
): void => {
  const data = {
    id: '99999999',
    created: new Date(),
    modified: new Date(),
    start: appointmentDateData?.start,
    end: appointmentDateData?.end,
    typeId: propertyData?.type,
    description: appointmentDateData?.title,
    recurring: true,
    recurrence: null,
    cancelled: false,
    followUp: {
      due: appointmentDateData?.end,
      responseId: '999999',
      notes: appointmentDateData?.title,
    },
    propertyId: propertyData?.id,
    organiserId: negotiatorData?.id,
    negotiatorIds: propertyData?.negotiatorId,
    officeIds: propertyData?.officeIds,
    attendee: {
      id: '99999',
      type: 'applicant',
      contacts: [
        {
          id: '999999999',
          name: userInfoData?.name,
          homePhone: userInfoData?.phone,
          workPhone: userInfoData?.phone,
          mobilePhone: userInfoData?.phone,
          email: userInfoData?.email,
          fromArchive: false,
        },
      ],
    },
    accompanied: true,
    virtual: false,
    negotiatorConfirmed: true,
    attendeeConfirmed: true,
    propertyConfirmed: true,
    fromArchive: false,
    _eTag: null,
  };
  console.log(data);
};
