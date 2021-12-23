import React, { FC, ReactElement } from 'react';
import {
  Button,
  CardImageWrap,
  CardListHeading,
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  CardSubHeading,
  CardSubHeadingAdditional,
  CardWrap,
  FlexContainer,
  Icon,
  InputGroup,
} from '@reapit/elements';
import {
  AppointmentDateProps,
  ChangeCurrentStepType,
  NegotiatorDataType,
  PropertyDataType,
  PropertyImageDataType,
  UserInfoTypeProps,
} from '../SubTableAppointment';

type ModalSummaryType = {
  propertyData: PropertyDataType;
  propertyImagesData: PropertyImageDataType;
  userInfoData: UserInfoTypeProps;
  appointmentDateData: AppointmentDateProps;
  negotiatorData: NegotiatorDataType;
  changeStep: (status: ChangeCurrentStepType) => void;
};

const ModalSummary: FC<ModalSummaryType> = (props): ReactElement => {
  const { appointmentDateData, negotiatorData, propertyData, userInfoData } = props;

  // wrap negotiator data (will split the fn, later)
  const identityNegotiator = (negotiatorData: NegotiatorDataType) => {
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

  // wrap property address  (will split the fn, later)
  const identityTheAddress = (propertyData: PropertyDataType): string => {
    const buildingName = propertyData?.address?.buildingName ?? '';
    const buildingNumber = propertyData?.address?.buildingNumber ?? '';

    const address1 = `${propertyData?.address?.line1}, ` ?? '';
    const address2 = `${propertyData?.address?.line2}, ` ?? '';
    const address3 = `${propertyData?.address?.line3}` ?? '';

    const finalAddress = `${buildingName} ${buildingNumber} - ${address1}${address2}${address3}`;
    return finalAddress;
  };

  // get property location based coordinate  (will split the fn, later)
  const identityLocationCoordinate = (propertyData: PropertyDataType): string => {
    const latitude = propertyData?.address?.geolocation?.latitude;
    const longitude = propertyData?.address?.geolocation?.longitude;

    const coordinate = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return coordinate;
  };

  // convert time format to adjust with input tag value format (will split the fn, later)
  const convertTimeToAssignedInput = (date): string => {
    const convertedDate = new Date(date);
    return convertedDate.toISOString().substring(0, 16);
  };

  // declare some stuff to make dev easier
  const negotiator = identityNegotiator(negotiatorData);
  const propertyAddress = identityTheAddress(propertyData);
  const propertyCoordinate = identityLocationCoordinate(propertyData);
  const appointmentDateStart = convertTimeToAssignedInput(appointmentDateData?.start);
  const appointmentDateEnd = convertTimeToAssignedInput(appointmentDateData?.end);

  // function component zone start below
  const openGoogleMap = (coordinate: string): void => {
    window.open(coordinate);
  };

  const consoleDotLogThenPostToBackend = () => {
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
  // will split the component later
  return (
    <FlexContainer isFlexJustifyBetween>
      <CardWrap style={{ width: '40%', flexDirection: 'column' }} className='el-flex'>
        <CardSubHeading className='el-text-center'>Agent</CardSubHeading>
        <CardSubHeadingAdditional className='el-mx-auto'>{negotiator.name}</CardSubHeadingAdditional>
        <CardImageWrap style={{ width: '90%', height: '250px' }}>
          <img
            alt={negotiator.name}
            src={negotiator.photo}
            width='100%'
            style={{ objectFit: 'cover', height: '200px', objectPosition: 'center' }}
          />
        </CardImageWrap>
        <CardListHeading className='el-my5'>Contact</CardListHeading>
        <CardListItem>
          <CardListIcon>
            <Icon icon='phoneSystem' />
          </CardListIcon>
          <CardListItemTextWrap>
            <CardListItemTextPrimary>Phone Number</CardListItemTextPrimary>
            <CardListItemTextSecondary>{negotiator.phone}</CardListItemTextSecondary>
          </CardListItemTextWrap>
        </CardListItem>
        <CardListItem>
          <CardListIcon>
            <Icon icon='emailSystem' />
          </CardListIcon>
          <CardListItemTextWrap>
            <CardListItemTextPrimary>Email Address</CardListItemTextPrimary>
            <CardListItemTextSecondary>{negotiator.email}</CardListItemTextSecondary>
          </CardListItemTextWrap>
        </CardListItem>
      </CardWrap>
      <div style={{ display: 'flex', width: '58%', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <CardWrap className='el-mb3'>
            <CardSubHeading>Property Information</CardSubHeading>
            <div className='el-my6'>
              <InputGroup icon='geoLocationSolidSystem' defaultValue={propertyAddress} disabled label='Address' />
              <div className='el-flex el-flex-justify-end el-mt6'>
                <Button intent='primary' onClick={() => openGoogleMap(propertyCoordinate)}>
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </CardWrap>
          <CardWrap className='el-my3'>
            <CardSubHeading>Reserved of Appointment Date</CardSubHeading>
            <div className='el-mt4'>
              <InputGroup
                type='datetime-local'
                label='From'
                icon='calendarSystem'
                disabled
                defaultValue={appointmentDateStart}
              />
              <InputGroup
                type='datetime-local'
                label='Until'
                icon='calendarSystem'
                disabled
                defaultValue={appointmentDateEnd}
              />
            </div>
          </CardWrap>
        </div>
        <CardWrap>
          <div className='el-flex el-flex-justify-between el-mt10'>
            <Button intent='critical' onClick={consoleDotLogThenPostToBackend}>
              &gt; console.log
            </Button>
            <Button intent='success'>Submit </Button>
          </div>
        </CardWrap>
      </div>
    </FlexContainer>
  );
};

export default ModalSummary;
