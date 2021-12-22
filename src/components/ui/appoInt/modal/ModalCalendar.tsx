import React, { FC, useState, useEffect, ReactElement } from 'react';

import { AppointmentModelPagedResult } from '@reapit/foundations-ts-definitions';
import { Event, Calendar, Views, momentLocalizer, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { ChangeCurrentStepType, UserInfoTypeProps, UserPurposeProps } from '../SubTableAppointment';

type ModalCalendarType = {
  changeStep: (status: ChangeCurrentStepType) => void;
  events: AppointmentModelPagedResult['_embedded'] | undefined;
  userInfo: UserInfoTypeProps;
  userPurpose: (data: UserPurposeProps) => void;
};

const ModalCalendar: FC<ModalCalendarType> = (props): ReactElement => {
  const { changeStep, events, userInfo } = props;

  const [appointmentAvailableDate, setAppointmentAvailableDate] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  //   reserving data after make the appointment
  const reservingNewAppointment = (event: SlotInfo) => {
    const now = moment(new Date());
    const end = moment(event.start);
    const duration = moment.duration(now.diff(end)).asHours();

    if (duration < -24) {
      // if after 24 hours
      console.log('ok, lets make an appointment');
    } else if (duration > 0) {
      // if the days already over
      console.log('the days already over');
    } else {
      //
      console.log('you cant make appointment in 6 hours ahead');
    }

    const data = {
      id: '12312',
      title: `${userInfo?.name} - Looking around`,
      start: new Date(event.start),
      end: new Date(event.end),
      resource: {
        type: 'new',
      },
    };

    console.log(data);
    // go here
    // if data duration is valid, then go to next page
    // while not valid, appear the snack video
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
        defaultView={Views.WEEK}
        style={{ height: 450 }}
        views={['month', 'week', 'day']}
        step={30}
        timeslots={12}
        dayLayoutAlgorithm='no-overlap'
        onSelectSlot={reservingNewAppointment}
        onSelectEvent={(event) => console.log(event)}
      />
      <p>Tips: Drag start date and end date in calendar</p>
    </div>
  );
};

export default ModalCalendar;
