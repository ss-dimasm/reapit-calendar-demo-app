import React, { FC, ReactElement, useEffect, useState } from 'react';

import { Loader } from '@reapit/elements';
import { AppointmentModelPagedResult } from '@reapit/foundations-ts-definitions';

import { Event, Calendar, Views, momentLocalizer, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';

type ModalAppointmentDataProps = {
  events?: AppointmentModelPagedResult['_embedded'] | undefined;
  setReservedModalOpen: (data) => void;
};

const ModalAppointment: FC<ModalAppointmentDataProps> = (props): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appointmentAvailableDate, setAppointmentAvailableDate] = useState<Event[]>([]);

  const { events, setReservedModalOpen } = props;

  useEffect(() => {
    if (events) {
      const newData = events.map((event) => {
        return {
          id: event.id ?? '',
          title: event.description,
          start: new Date(event.start ?? ''),
          end: new Date(event.end ?? ''),
          resource: {
            tag: event._eTag,
            id: event.id,
            viewType: event.typeId,
          },
        };
      });
      setAppointmentAvailableDate(newData);
      setIsLoading(false);
    }
  }, [events]);

  const localizer = momentLocalizer(moment);

  if (isLoading) {
    return (
      <>
        <div className='el-flex el-flex-justify-center'>
          <Loader label='Getting some information..' />
        </div>
      </>
    );
  }

  const reservingNewAppointment = (event: SlotInfo) => {
    const data = {
      id: '12312',
      title: 'New Applicants',
      start: new Date(event.start),
      end: new Date(event.end),
      resource: {
        type: 'new',
      },
    };
    setReservedModalOpen(data);
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={appointmentAvailableDate}
        startAccessor='start'
        endAccessor='end'
        defaultDate={new Date(Date.now())}
        defaultView={Views.DAY}
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        step={30}
        timeslots={12}
        dayLayoutAlgorithm='no-overlap'
        onSelectSlot={reservingNewAppointment}
        onSelectEvent={(event) => console.log(event)}
      />
    </div>
  );
};

export default ModalAppointment;
