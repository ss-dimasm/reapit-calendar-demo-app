/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, FC, ReactElement } from 'react';

import {
	AppointmentModelPagedResult,
	NegotiatorModel,
	PropertyImageModelPagedResult,
	PropertyModel,
} from '@reapit/foundations-ts-definitions';
import { useReapitConnect } from '@reapit/connect-session';

import { reapitConnectBrowserSession } from '../../../../core/connect-session';
import { getAppointmentDateByNegotiatorId } from '../../../../platform-api/negotiatorResource';
import Loading from '../../utils/Loading';
import { Calendar, Event, momentLocalizer, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Button, FlexContainer, Icon, useModal } from '@reapit/elements';
import AgentPropertyData from './AgentPropertyData';

type AgentCalendarProps = {
	negotiatorId: NegotiatorModel['id'] | undefined;
	appointmentData: AppointmentModelPagedResult | undefined;
};
const AgentCalendar: FC<AgentCalendarProps> = (props): ReactElement => {
	const { appointmentData, negotiatorId } = props;
	const [appointmentsEventData, setAppointmentsEventData] = useState<Event[]>();

	const { Modal: ModalDetails, openModal: openModalDetails, closeModal: closeModalDetails } = useModal('root');
	const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

	const [singleAppointmentDate, setSingleAppointmentDate] = useState<any>(undefined);
	useEffect(() => {
		if (appointmentData?._embedded) {
			const newData = appointmentData?._embedded.map((event) => {
				return {
					id: event.id ?? '',
					title: event.description,
					start: new Date(event.start ?? ''),
					end: new Date(event.end ?? ''),
					resource: {
						tag: event._eTag,
						id: event.id,
						viewType: event.typeId,
						propertyId: event.propertyId,
						attendee: event.attendee,
					},
				};
			});
			setAppointmentsEventData(newData);
		}
	}, [appointmentData]);

	if (props.appointmentData === undefined) return <Loading text='getting appointments data' isCenter isFullScreen />;

	const localizer = momentLocalizer(moment);

	// open modal fn
	const openModalEventDetails = (e): void => {
		setSingleAppointmentDate(e);
		setModalTitle(e.title);
		openModalDetails();
	};

	// close modal fn
	const closeModalEventDetails = (): void => {
		closeModalDetails();
	};

	return (
		<div style={{ width: '75%' }}>
			<Calendar
				events={appointmentsEventData}
				localizer={localizer}
				startAccessor='start'
				endAccessor='end'
				views={['month', 'day']}
				popup={true}
				scrollToTime={new Date()}
				onSelectEvent={(e) => openModalEventDetails(e)}
			/>
			<ModalDetails title={modalTitle} onModalClose={closeModalEventDetails}>
				<AgentPropertyData
					selectedAppointmentDate={singleAppointmentDate}
					propertyId={singleAppointmentDate?.resource?.propertyId ?? undefined}
				/>
			</ModalDetails>
		</div>
	);
};

export default AgentCalendar;
