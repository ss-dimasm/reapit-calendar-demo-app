import React, { FC, useState, useEffect, ReactElement } from 'react'

import {
  Event,
  Calendar,
  Views,
  momentLocalizer,
  SlotInfo,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { ModalCalendarType } from '../../../../interfaces/appointmentInterfaces'
import { useSnack } from '@reapit/elements'

const ModalCalendar: FC<ModalCalendarType> = (props): ReactElement => {
  const { changeStep, changeAppointmentDate, events, userInfo } = props

  const [appointmentAvailableDate, setAppointmentAvailableDate] = useState<
    Event[]
  >([])

  const { custom } = useSnack()

  // return the appointment data
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
        }
      })
      setAppointmentAvailableDate(newData)
    }
  }, [events])

  const localizer = momentLocalizer(moment)

  //   reserving data after make the appointment
  const reservingNewAppointment = (event: SlotInfo) => {
    const now = moment(new Date())
    const end = moment(event.start)
    const duration = moment.duration(now.diff(end)).asHours()

    if (duration < -24) {
      // if after 24 hours
      const data = {
        id: '12312',
        title: `${userInfo?.name} - ${userInfo?.purpose}`,
        start: event.start,
        end: event.end,
        resource: {
          type: 'new',
        },
      }

      // set data
      changeAppointmentDate(data)
      changeStep('forward')
    } else if (duration > 0) {
      custom(
        {
          text: 'You cant make appointment when the day already over',
          icon: 'warningSolidSystem',
          intent: 'danger',
        },
        2500
      )
    } else {
      custom(
        {
          text: 'You must make appointment after 24 hours ahead',
          icon: 'warningSolidSystem',
          intent: 'critical',
        },
        2500
      )
    }
  }

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={appointmentAvailableDate}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date(Date.now())}
        defaultView={Views.WEEK}
        style={{ height: 450 }}
        views={['month', 'week', 'day']}
        step={30}
        timeslots={6}
        dayLayoutAlgorithm="no-overlap"
        onSelectSlot={reservingNewAppointment}
        onSelectEvent={(event) => console.log(event)}
      />
      <p className="el-mt3">Tips: Drag start date and end date in calendar</p>
    </div>
  )
}

export default ModalCalendar
