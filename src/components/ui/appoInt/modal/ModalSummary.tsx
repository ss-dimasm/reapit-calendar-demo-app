import React, { FC, ReactElement, useState, useEffect } from 'react';

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
	identityNegotiator,
	identityTheAddress,
	identityLocationCoordinate,
	convertTimeToAssignedInput,
	consoleDotLogThenPostToBackend,
	retrieveAppointmentDataPostModel,
} from '../../../../utils/modalSummaryUtils';

import { CreateAppointmentModelType, ModalSummaryType } from '../../../../interfaces/appointmentInterfaces';

import { useReapitConnect } from '@reapit/connect-session';
import { reapitConnectBrowserSession } from '../../../../core/connect-session';
import { postNewAppointment } from '../../../../platform-api/appointmentsResource';
import ModalFetch from './ModalFetch';

const ModalSummary: FC<ModalSummaryType> = (props): ReactElement => {
	const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

	const {
		appointmentDateData,
		negotiatorData,
		propertyData,
		finalReservedAppointment,
		setFinalReservedAppointment,
		changeStep,
	} = props;

	const [isFetching, setIsFetching] = useState<boolean>(false);

	useEffect(() => {
		if (!finalReservedAppointment) return;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const postDataToServer = async (): Promise<CreateAppointmentModelType | undefined> => {
			if (!connectSession) return;
			const serviceResponse = await postNewAppointment(connectSession, finalReservedAppointment);

			if (serviceResponse) {
				setIsFetching(false);
				changeStep('forward');
			}
		};
		if (connectSession) {
			postDataToServer();
		}
	}, [connectSession, finalReservedAppointment]);

	// declare some stuff to make dev easier
	const negotiator = identityNegotiator(negotiatorData);
	const propertyAddress = identityTheAddress(propertyData);
	const propertyCoordinate = identityLocationCoordinate(propertyData);
	const appointmentDateStart = convertTimeToAssignedInput(appointmentDateData?.start);
	const appointmentDateEnd = convertTimeToAssignedInput(appointmentDateData?.end);

	// function component zone start below
	const consoleDotLog = (): void => consoleDotLogThenPostToBackend(appointmentDateData, propertyData, negotiatorData);
	const openGoogleMap = (coordinate: string): Window | null => window.open(coordinate);
	const sendDataToServer = (): void => {
		setIsFetching(true);
		const data = retrieveAppointmentDataPostModel(appointmentDateData, propertyData, negotiatorData);
		setFinalReservedAppointment(data);
	};

	if (isFetching) return <ModalFetch />;
	// will split the component later
	return (
		<FlexContainer isFlexJustifyBetween>
			<CardWrap style={{ width: '40%', flexDirection: 'column' }} className='el-flex'>
				<CardSubHeading className='el-text-center'>Agent</CardSubHeading>
				<CardSubHeadingAdditional className='el-mx-auto'>{negotiator.name}</CardSubHeadingAdditional>
				<CardImageWrap className='el-mx-auto' style={{ width: '90%', height: '250px', marginRight: '0.75rem' }}>
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
						<CardSubHeading>
							Reserved Appointment Date <br />
							<span style={{ fontSize: '0.75rem' }}>(GMT+0 Zone)</span>
						</CardSubHeading>
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
						<Button intent='success' chevronRight onClick={sendDataToServer}>
							Submit{' '}
						</Button>
					</div>
				</CardWrap>
			</div>
		</FlexContainer>
	);
};

export default ModalSummary;
