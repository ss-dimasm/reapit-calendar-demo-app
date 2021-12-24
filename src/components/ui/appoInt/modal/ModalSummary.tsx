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

import {
  identityNegotiator,
  identityTheAddress,
  identityLocationCoordinate,
  convertTimeToAssignedInput,
  consoleDotLogThenPostToBackend,
} from '../../../../utils/modalSummaryUtils';

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

  // declare some stuff to make dev easier
  console.log(appointmentDateData);
  const negotiator = identityNegotiator(negotiatorData);
  const propertyAddress = identityTheAddress(propertyData);
  const propertyCoordinate = identityLocationCoordinate(propertyData);
  const appointmentDateStart = convertTimeToAssignedInput(appointmentDateData?.start);
  const appointmentDateEnd = convertTimeToAssignedInput(appointmentDateData?.end);

  const consoleDotLog = (): void =>
    consoleDotLogThenPostToBackend(appointmentDateData, propertyData, negotiatorData, userInfoData);
  // function component zone start below
  const openGoogleMap = (coordinate: string): Window | null => window.open(coordinate);

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
            <CardSubHeading>Reserved Appointment Date</CardSubHeading>
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
            <Button intent='critical' chevronLeft onClick={consoleDotLog}>
              &gt; console.log
            </Button>
            <Button intent='success' chevronRight>
              Submit{' '}
            </Button>
          </div>
        </CardWrap>
      </div>
    </FlexContainer>
  );
};

export default ModalSummary;
