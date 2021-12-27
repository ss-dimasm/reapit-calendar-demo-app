import React, { FC, ReactElement, useState, useEffect } from 'react';

import {
	Button,
	CardHeading,
	CardHeadingWrap,
	CardWrap,
	FlexContainer,
	SnackProvider,
	Steps,
	useModal,
} from '@reapit/elements';
import { useReapitConnect } from '@reapit/connect-session';

import { reapitConnectBrowserSession } from '../../../core/connect-session';
import {
	getAppointmentDateByNegotiatorId,
	getNegotiatorDataByNegotiatorId,
} from '../../../platform-api/negotiatorResource';

import ModalAppointment from './ModalAppointment';
import Spacer from '../Spacer';
import { getPropertyDataByPropertyId, getPropertyImagesByPropertyId } from '../../../platform-api/propertyResource';
import Loading from '../utils/Loading';
import {
	AppointmentDateProps,
	AppointmentModelPagedResultVamp,
	ChangeCurrentStepType,
	CreateAppointmentModelType,
	ModalStatsType,
	NegotiatorDataType,
	PropertyDataType,
	PropertyImageDataType,
	SubTableAppointmentProps,
	UserInfoType,
	UserInfoTypeProps,
} from '../../../interfaces/appointmentInterfaces';

/**
 * The Main Logic from Modal Content Start from Here
 */

const SubTableAppointment: FC<SubTableAppointmentProps> = (props): ReactElement => {
	const { connectSession } = useReapitConnect(reapitConnectBrowserSession);
	const { propertyId, negoId, description } = props;

	const [isLoading, setIsLoading] = useState<boolean>(true); // user must wait after modal appear
	const [modalStats, setModalStats] = useState<ModalStatsType>('details');
	const [modalTitle, setModalTitle] = useState<string>('Property Details');
	const [negotiatorId, setNegotiatorId] = useState<string | undefined>(undefined);
	const [negotiatorData, setNegotiatorData] = useState<NegotiatorDataType>(undefined);
	const [propertyData, setPropertyData] = useState<PropertyDataType>(undefined);
	const [propertyImageData, setPropertyImageData] = useState<PropertyImageDataType>(undefined);
	const [appointmentProperty, setAppointmentProperty] = useState<AppointmentModelPagedResultVamp>(undefined);
	const [currentStep, setCurrentStep] = useState<string>('1');
	const [userInfo, setUserInfo] = useState<UserInfoTypeProps>(undefined);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [, setUserPurpose] = useState<string | undefined>(undefined);
	const [reservedAppointmentDate, setReservedAppointmentDate] = useState<AppointmentDateProps>(undefined);
	const [finalReservedAppointment, setFinalReservedAppointment] = useState<CreateAppointmentModelType | undefined>(
		undefined
	);

	// Modal Config
	const { Modal: ModalA, openModal: openModalA, closeModal: closeModalA } = useModal('root');

	// fetch appointment by property id
	useEffect(() => {
		if (!negotiatorId) return; //prevent consume endpoint, if the negotiatorId is undefined

		// get appointment data list from property's negotiator id
		const fetchAppointmentDataByNegotiator = async (): Promise<AppointmentModelPagedResultVamp> => {
			if (!connectSession) return;
			const serviceResponse = await getAppointmentDateByNegotiatorId(connectSession, negotiatorId);

			if (serviceResponse) {
				setAppointmentProperty(serviceResponse);
			}
		};

		// get negotiator data from negotiator id
		const fetchNegotiatorDataByNegotiatorId = async (): Promise<NegotiatorDataType> => {
			if (!connectSession) return;

			const serviceResponse = await getNegotiatorDataByNegotiatorId(connectSession, negotiatorId);

			if (serviceResponse) {
				setIsLoading(false);
				setNegotiatorData(serviceResponse);
			}
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

			if (serviceResponse) setPropertyImageData(serviceResponse);
		};

		if (connectSession) {
			fetchAppointmentDataByNegotiator();
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
		setModalStats('details');
		setModalTitle('Property Details');
		setNegotiatorId(undefined);
		setNegotiatorData(undefined);
		setPropertyData(undefined);
		setPropertyImageData(undefined);
		setAppointmentProperty(undefined);
		setCurrentStep('1');
		setUserInfo(undefined);
		setReservedAppointmentDate(undefined);
		setIsLoading(true);
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
				setCurrentStep(currentStepInt.toString());
				// change the modal stats
				if (modalStats === 'details') setModalStats('identity');
				if (modalStats === 'identity') setModalStats('reserving');
				if (modalStats === 'reserving') setModalStats('summary');
				if (modalStats === 'summary') setModalStats('receipt');
				break;
			case 'backward':
				currentStepInt--;
				setCurrentStep(currentStepInt.toString());
				if (modalStats === 'reserving') setModalStats('details');
				if (modalStats === 'identity') setModalStats('reserving');
				if (modalStats === 'summary') setModalStats('identity');
				break;
		}
	};

	// change user info
	const changeUserInfo = (data: UserInfoType): void => setUserInfo(data);

	// change user purpose at reserving date
	const changeUserPurpose = (data: string | undefined): void => setUserPurpose(data);

	// set the reserved appointmentDate
	const changeAppointmentDate = (data: AppointmentDateProps): void => setReservedAppointmentDate(data);

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

	const updateReservedAppointmentDate = (data: CreateAppointmentModelType): void => setFinalReservedAppointment(data);
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
							<Loading text='Please wait..' isCenter={true} />
						</>
					) : (
						<>
							<div className='el-mb6 el-flex el-flex-justify-center'>
								<Steps steps={['1', '2', '3', '4', '5']} selectedStep={currentStep} />
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
									finalReservedAppointment={finalReservedAppointment}
									changeAppointmentDate={changeAppointmentDate}
									changeUserInfo={changeUserInfo}
									userPurpose={changeUserPurpose}
									changeStep={toggleChangeStep}
									setFinalReservedAppointment={updateReservedAppointmentDate}
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
