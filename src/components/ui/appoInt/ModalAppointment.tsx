import React, { FC, ReactElement } from 'react';

import { ModalAppointmentDataProps } from '../../../interfaces/appointmentInterfaces';

import ModalDetail from './modal/ModalDetail';
import ModalIdentity from './modal/ModalIdentity';
import ModalCalendar from './modal/ModalCalendar';
import ModalSummary from './modal/ModalSummary';
import ModalReceipt from './modal/ModalReceipt';

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
		finalReservedAppointment,
		changeStep,
		changeUserInfo,
		userPurpose,
		changeAppointmentDate,
		setFinalReservedAppointment,
		closeModalProperty,
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
				events={events}
				changeAppointmentDate={changeAppointmentDate}
				userInfo={userInfo}
				changeStep={changeStep}
				userPurpose={userPurpose}
			/>
		);
	}

	// summary result, if button pressed then will appear new receipt (end here)
	if (modalStats === 'summary') {
		return (
			<ModalSummary
				propertyData={propertyData}
				propertyImagesData={propertyImageData}
				userInfoData={userInfo}
				negotiatorData={negotiatorData}
				appointmentDateData={appointmentDateData}
				finalReservedAppointment={finalReservedAppointment}
				changeStep={changeStep}
				setFinalReservedAppointment={setFinalReservedAppointment}
			/>
		);
	}
	return (
		<>
			<ModalReceipt
				userInfoData={userInfo}
				negotiatorData={negotiatorData}
				finalReservedAppointment={finalReservedAppointment}
				changeStep={changeStep}
				closeModalProperty={closeModalProperty}
			/>
		</>
	);

	// last step, eh?
};

export default ModalAppointment;
