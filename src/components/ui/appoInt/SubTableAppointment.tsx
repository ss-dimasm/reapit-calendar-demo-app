import React, { FC, ReactElement, useState, useEffect } from 'react';

import { Button, CardHeading, CardHeadingWrap, CardWrap, FlexContainer, Steps, useModal } from '@reapit/elements';
import { AppointmentModelPagedResult, PropertyModel } from '@reapit/foundations-ts-definitions';
import { useReapitConnect } from '@reapit/connect-session';

import { Event } from 'react-big-calendar';

import { reapitConnectBrowserSession } from '../../../core/connect-session';
import { getAppointmentDateByNegotiatorId } from '../../../platform-api/negotiatorResource';
import ModalAppointment from './ModalAppointment';
import Spacer from '../Spacer';

type SubTableAppointmentProps = {
  propertyId: PropertyModel['id'];
  negoId: PropertyModel['negotiatorId'];
  description: PropertyModel['description'];
};
export type UserInfoType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | number | undefined;
  purpose: string | undefined;
};
type NegotiatorType = string | undefined;
type AppointmentModelPagedResultVamp = AppointmentModelPagedResult | undefined;
type CurrentStepType = string;
export type ChangeCurrentStepType = 'forward' | 'backward';
export type ModalStatsType = 'details' | 'identity' | 'reserving' | 'summary';
export type UserInfoTypeProps = UserInfoType | undefined;
export type UserPurposeProps = string | undefined;
/**
 * main Logic from Modal Content
 */
const SubTableAppointment: FC<SubTableAppointmentProps> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);
  const { propertyId, negoId, description } = props;

  const [negotiatorId, setNegotiatorId] = useState<NegotiatorType>(undefined);
  const [appointmentProperty, setAppointmentProperty] = useState<AppointmentModelPagedResultVamp>();
  const [reservedEvent, setReservedEvent] = useState<Event>();
  const [modalStats, setModalStats] = useState<ModalStatsType>('details');
  const [currentStep, setCurrentStep] = useState<CurrentStepType>('1');
  const [userInfo, setUserInfo] = useState<UserInfoTypeProps>(undefined);
  const [userPurpose, setUserPurpose] = useState<UserPurposeProps>(undefined);

  // Modal Config
  const { Modal: ModalA, openModal: openModalA, closeModal: closeModalA } = useModal('root');

  // fetch appointment by property id
  useEffect(() => {
    if (!negotiatorId) return; //prevent consume endpoint, if the negotiatorId is undefined

    const fetchAppointmentProperty = async (): Promise<AppointmentModelPagedResultVamp> => {
      if (!connectSession) return;
      const serviceResponse = await getAppointmentDateByNegotiatorId(connectSession, negotiatorId);

      if (serviceResponse) {
        setAppointmentProperty(serviceResponse);
      }
    };

    if (connectSession) fetchAppointmentProperty();
  }, [connectSession, negotiatorId]);

  //   toggle active modal
  const openModalProperty = (id: SubTableAppointmentProps['negoId']): void => {
    openModalA();
    setNegotiatorId(id);
    setCurrentStep('1');
  };

  //   toggle close modal (reset everything)
  const closeModalProperty = (): void => {
    closeModalA();
    setNegotiatorId(undefined);
    setAppointmentProperty(undefined);
    setModalStats('details');
    setCurrentStep('1');
    setUserInfo(undefined);
  };

  //   toggle reserved
  const openReservedCalendar = (data): void => {
    setReservedEvent(data);
    setModalStats('details');
    // make new view with new negotiator
  };

  // change step and modal stats
  const toggleChangeStep = (status: ChangeCurrentStepType): void => {
    let currentStepInt = parseInt(currentStep);
    switch (status) {
      case 'forward':
        currentStepInt++;
        let currentStepStr = currentStepInt.toString();
        setCurrentStep(currentStepStr);
        // change the modal stats
        if (modalStats === 'details') setModalStats('identity');
        if (modalStats === 'identity') setModalStats('reserving');
        if (modalStats === 'reserving') setModalStats('summary');
        break;
      case 'backward':
        currentStepInt--;
        currentStepStr = currentStepInt.toString();
        setCurrentStep(currentStepStr);
        if (modalStats === 'reserving') setModalStats('details');
        if (modalStats === 'identity') setModalStats('reserving');
        if (modalStats === 'summary') setModalStats('identity');
        break;
    }
  };

  // change user info
  const changeUserInfo = (data: UserInfoType): void => {
    setUserInfo(data);
  };

  // change user purpose at reserving date
  const changeUserPurpose = (data: UserPurposeProps): void => {
    setUserPurpose(data);
  };

  return (
    <>
      <CardWrap>
        <FlexContainer isFlexJustifyBetween>
          <CardHeadingWrap className='el-mt6'>
            <CardHeading>Description</CardHeading>
            <div
              className='el-flex-wrap'
              dangerouslySetInnerHTML={{ __html: description ?? 'Description unavailable' }}
            />
          </CardHeadingWrap>
          <Button className='el-ml6' intent='secondary' onClick={() => openModalProperty(negoId)}>
            Book Now
          </Button>
        </FlexContainer>
      </CardWrap>
      <ModalA title='Reserving' onModalClose={closeModalProperty}>
        <div className='el-mb6 el-flex el-flex-justify-center'>
          <Steps steps={['1', '2', '3', '4']} selectedStep={currentStep} />
        </div>
        <Spacer number={10} />
        <div className='el-mt6'>
          <ModalAppointment
            changeStep={toggleChangeStep}
            propertyId={propertyId}
            negotiatorId={negotiatorId}
            modalStats={modalStats}
            events={appointmentProperty?._embedded}
            setReservedModalOpen={openReservedCalendar}
            changeUserInfo={changeUserInfo}
            userInfo={userInfo}
            userPurpose={changeUserPurpose}
          />
        </div>
      </ModalA>
    </>
  );
};

export default SubTableAppointment;
