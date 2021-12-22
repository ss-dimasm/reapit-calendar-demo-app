import React, { FC, ReactElement } from 'react';

import { AppointmentModelPagedResult, NegotiatorModel, PropertyModel } from '@reapit/foundations-ts-definitions';
import {
  ChangeCurrentStepType,
  ModalStatsType,
  UserInfoType,
  UserInfoTypeProps,
  UserPurposeProps,
} from './SubTableAppointment';
import ModalDetail from './modal/ModalDetail';
import ModalIdentity from './modal/ModalIdentity';
import ModalCalendar from './modal/ModalCalendar';

type ModalAppointmentDataProps = {
  modalStats: ModalStatsType;
  propertyId: PropertyModel['id'];
  negotiatorId: NegotiatorModel['id'];
  events: AppointmentModelPagedResult['_embedded'] | undefined;
  userInfo: UserInfoTypeProps;
  changeStep: (status: ChangeCurrentStepType) => void;
  setReservedModalOpen: (data) => void;
  changeUserInfo: (data: UserInfoType) => void;
  userPurpose: (data: UserPurposeProps) => void;
};

const ModalAppointment: FC<ModalAppointmentDataProps> = (props): ReactElement => {
  // desctruc props
  const { propertyId, negotiatorId, modalStats, events, changeStep, changeUserInfo, userInfo, userPurpose } = props;

  // first here to identity the property and negotiator
  if (modalStats === 'details') {
    return <ModalDetail negotiatorId={negotiatorId} propertyId={propertyId} changeStep={changeStep} />;
  }

  // fill up the form
  if (modalStats === 'identity') {
    return <ModalIdentity changeStep={changeStep} changeUserInfo={changeUserInfo} />;
  }

  console.log(userInfo);
  // choosing date
  if (modalStats === 'reserving') {
    return <ModalCalendar events={events} changeStep={changeStep} userInfo={userInfo} userPurpose={userPurpose} />;
    // set name of applicants
    // appear the calendar to get appointment
  }

  // summary result, if button pressed then will appear new receipt
  return (
    <>
      <p>give the details that already reserving</p>
      <p>like: meet at...</p>
      <p>like: when</p>
      <p>and give details in JSON file</p>
    </>
  );
  // get details information, able to confirm it
};

export default ModalAppointment;
