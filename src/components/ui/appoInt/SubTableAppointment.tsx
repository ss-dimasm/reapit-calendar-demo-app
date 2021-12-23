import React, { FC, ReactElement, useState, useEffect } from 'react';

import {
  Button,
  CardHeading,
  CardHeadingWrap,
  CardWrap,
  FlexContainer,
  Loader,
  SnackProvider,
  Steps,
  useModal,
} from '@reapit/elements';
import {
  AppointmentModelPagedResult,
  NegotiatorModel,
  PropertyImageModelPagedResult,
  PropertyModel,
} from '@reapit/foundations-ts-definitions';
import { useReapitConnect } from '@reapit/connect-session';

import { stringOrDate } from 'react-big-calendar';

import { reapitConnectBrowserSession } from '../../../core/connect-session';
import {
  getAppointmentDateByNegotiatorId,
  getNegotiatorDataByNegotiatorId,
} from '../../../platform-api/negotiatorResource';
import ModalAppointment from './ModalAppointment';
import Spacer from '../Spacer';
import { getPropertyDataByPropertyId, getPropertyImagesByPropertyId } from '../../../platform-api/propertyResource';

type SubTableAppointmentProps = {
  propertyId: PropertyModel['id'];
  negoId: PropertyModel['negotiatorId'];
  description: PropertyModel['description'];
};
type NegotiatorType = NegotiatorModel['id'] | undefined;
type AppointmentModelPagedResultVamp = AppointmentModelPagedResult | undefined;
type CurrentStepType = string;
type AppointmentDateType = {
  id: string | number | undefined;
  title: string | undefined;
  start: stringOrDate | any;
  end: stringOrDate | any;
  resource: {
    type: string;
  };
};

export type ChangeCurrentStepType = 'forward' | 'backward';
export type ModalStatsType = 'details' | 'identity' | 'reserving' | 'summary';
export type PropertyDataType = PropertyModel | undefined;
export type UserInfoTypeProps = UserInfoType | undefined;
export type UserPurposeProps = string | undefined;
export type AppointmentDateProps = AppointmentDateType | undefined;
export type NegotiatorDataType = NegotiatorModel | undefined;
export type PropertyImageDataType = PropertyImageModelPagedResult | undefined;
export type UserInfoType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | number | undefined;
  purpose: string | undefined;
};

/**
 * The Main Logic from Modal Content Start from Here
 */

const SubTableAppointment: FC<SubTableAppointmentProps> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);
  const { propertyId, negoId, description } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalStats, setModalStats] = useState<ModalStatsType>('details');
  const [modalTitle, setModalTitle] = useState<string>('Property Details');
  const [negotiatorId, setNegotiatorId] = useState<NegotiatorType>(undefined);
  const [negotiatorData, setNegotiatorData] = useState<NegotiatorDataType>(undefined);
  const [propertyData, setPropertyData] = useState<PropertyDataType>(undefined);
  const [propertyImageData, setPropertyImageData] = useState<PropertyImageDataType>(undefined);
  const [appointmentProperty, setAppointmentProperty] = useState<AppointmentModelPagedResultVamp>();
  const [currentStep, setCurrentStep] = useState<CurrentStepType>('1');
  const [userInfo, setUserInfo] = useState<UserInfoTypeProps>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPurpose, setUserPurpose] = useState<UserPurposeProps>(undefined);
  const [reservedAppointmentDate, setReservedAppointmentDate] = useState<AppointmentDateProps>(undefined);

  // Modal Config
  const { Modal: ModalA, openModal: openModalA, closeModal: closeModalA } = useModal('root');

  // fetch appointment by property id
  useEffect(() => {
    if (!negotiatorId) return; //prevent consume endpoint, if the negotiatorId and propertyId is undefined

    const fetchAppointmentProperty = async (): Promise<AppointmentModelPagedResultVamp> => {
      if (!connectSession) return;
      const serviceResponse = await getAppointmentDateByNegotiatorId(connectSession, negotiatorId);

      if (serviceResponse) setAppointmentProperty(serviceResponse);
    };

    const fetchNegotiatorDataByNegotiatorId = async (): Promise<NegotiatorDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getNegotiatorDataByNegotiatorId(connectSession, negotiatorId);

      if (serviceResponse) setNegotiatorData(serviceResponse);
    };

    // get property data by id
    const fetchPropertyDataByPropertyId = async (): Promise<PropertyDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getPropertyDataByPropertyId(connectSession, propertyId);

      if (serviceResponse) setPropertyData(serviceResponse);
    };
    //   get property data image
    const fetchPropertyDataImagesByPropertyId = async (): Promise<PropertyImageDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getPropertyImagesByPropertyId(connectSession, propertyId);

      if (serviceResponse) {
        setPropertyImageData(serviceResponse);
        setIsLoading(false);
      }
    };

    if (connectSession) {
      fetchAppointmentProperty();
      fetchNegotiatorDataByNegotiatorId();
      fetchPropertyDataByPropertyId();
      fetchPropertyDataImagesByPropertyId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession, negotiatorId]);

  //   toggle active modal
  const openModalProperty = (id: SubTableAppointmentProps['negoId']): void => {
    openModalA();
    setNegotiatorId(id);
    setCurrentStep('1');
  };

  //   toggle close modal (reset every states thing) :)
  const closeModalProperty = (): void => {
    setNegotiatorId(undefined);
    setAppointmentProperty(undefined);
    setModalStats('details');
    setCurrentStep('1');
    setUserInfo(undefined);
    setReservedAppointmentDate(undefined);
    setModalTitle('Property Details');
    setIsLoading(true);
    setPropertyData(undefined);
    setPropertyImageData(undefined);
    closeModalA();
  };

  // change step and modal stats
  const toggleChangeStep = (status: ChangeCurrentStepType): void => {
    const title = setUpModalTitle(modalStats);
    setModalTitle(title);

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

  // set the reserved appointmentDate
  const changeAppointmentDate = (data: AppointmentDateProps): void => {
    setReservedAppointmentDate(data);
  };

  // configure the modal title
  const setUpModalTitle = (modalStats: ModalStatsType): string => {
    switch (modalStats) {
      case 'details':
        return 'Your Account information';
      case 'identity':
        return 'Select Appointment Date & Time';
      default:
        return 'Your Reservation Appointment Summary';
    }
  };

  return (
    <>
      <SnackProvider>
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
        <ModalA title={modalTitle} onModalClose={closeModalProperty}>
          {isLoading ? (
            <>
              <div className='el-flex el-flex-justify-center'>
                <Loader label='please wait...' />
              </div>
            </>
          ) : (
            <>
              <div className='el-mb6 el-flex el-flex-justify-center'>
                <Steps steps={['1', '2', '3', '4']} selectedStep={currentStep} />
              </div>
              <Spacer number={10} />
              <div className='el-mt6'>
                <ModalAppointment
                  propertyImageData={propertyImageData}
                  propertyData={propertyData}
                  negotiatorData={negotiatorData}
                  modalStats={modalStats}
                  appointmentDateData={reservedAppointmentDate}
                  userInfo={userInfo}
                  events={appointmentProperty?._embedded}
                  changeAppointmentDate={changeAppointmentDate}
                  changeUserInfo={changeUserInfo}
                  userPurpose={changeUserPurpose}
                  changeStep={toggleChangeStep}
                />
              </div>
            </>
          )}
        </ModalA>
      </SnackProvider>
    </>
  );
};

export default SubTableAppointment;
