import React, { FC, ReactElement } from 'react';

import { AppointmentModelPagedResult, NegotiatorModel } from '@reapit/foundations-ts-definitions';
import {
  AppointmentDateProps,
  ChangeCurrentStepType,
  ModalStatsType,
  PropertyDataType,
  PropertyImageDataType,
  UserInfoType,
  UserInfoTypeProps,
  UserPurposeProps,
} from './SubTableAppointment';
import ModalDetail from './modal/ModalDetail';
import ModalIdentity from './modal/ModalIdentity';
import ModalCalendar from './modal/ModalCalendar';
import ModalSummary from './modal/ModalSummary';

type ModalAppointmentDataProps = {
  modalStats: ModalStatsType;
  propertyData: PropertyDataType;
  propertyImageData: PropertyImageDataType;
  negotiatorData: NegotiatorModel | undefined;
  events: AppointmentModelPagedResult['_embedded'] | undefined;
  userInfo: UserInfoTypeProps;
  appointmentDateData: AppointmentDateProps;
  changeStep: (status: ChangeCurrentStepType) => void;
  changeUserInfo: (data: UserInfoType) => void;
  userPurpose: (data: UserPurposeProps) => void;
  changeAppointmentDate: (data: AppointmentDateProps) => void;
};

const ModalAppointment: FC<ModalAppointmentDataProps> = (props): ReactElement => {
  // desctruc props
  const {
    modalStats,
    propertyData,
    propertyImageData,
    negotiatorData,
    events,
    userInfo,
    appointmentDateData,
    changeStep,
    changeUserInfo,
    userPurpose,
    changeAppointmentDate,
  } = props;

  // first step is here, to identity the property and negotiator
  if (modalStats === 'details') {
    return (
      <ModalDetail
        propertyData={propertyData}
        propertyImageData={propertyImageData}
        negotiatorData={negotiatorData}
        changeStep={changeStep}
      />
    );
  }

  // fill up the form of information user
  if (modalStats === 'identity') {
    return <ModalIdentity changeStep={changeStep} changeUserInfo={changeUserInfo} />;
  }

  // choosing reservation of appointment date
  if (modalStats === 'reserving') {
    return (
      <ModalCalendar
        changeAppointmentDate={changeAppointmentDate}
        events={events}
        changeStep={changeStep}
        userInfo={userInfo}
        userPurpose={userPurpose}
      />
    );
  }

  // summary result, if button pressed then will appear new receipt (end here)
  return (
    <ModalSummary
      propertyData={propertyData}
      propertyImagesData={propertyImageData}
      userInfoData={userInfo}
      changeStep={changeStep}
      negotiatorData={negotiatorData}
      appointmentDateData={appointmentDateData}
    />
  );
};

export default ModalAppointment;
