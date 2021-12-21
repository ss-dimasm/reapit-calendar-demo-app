import React, { FC, ReactElement, useState, useEffect } from 'react';

import { Button, CardHeading, CardHeadingWrap, CardWrap, FlexContainer, useModal } from '@reapit/elements';
import { AppointmentModelPagedResult, PropertyModel } from '@reapit/foundations-ts-definitions';
import { useReapitConnect } from '@reapit/connect-session';

import ModalAppointment from './ModalAppointment';

import { reapitConnectBrowserSession } from '../../../core/connect-session';
import { getListOfAppointmentsByPropertyId } from '../../../platform-api/appointmentsResource';
import { SlotInfo, Event } from 'react-big-calendar';

type SubTableAppointmentProps = {
  id: PropertyModel['id'];
  description: PropertyModel['description'] | any;
};

type ModalStatsType = 'open' | 'reserving';

const SubTableAppointment: FC<SubTableAppointmentProps> = (props: SubTableAppointmentProps): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

  const { id, description } = props;

  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);
  const [appointmentProperty, setAppointmentProperty] = useState<AppointmentModelPagedResult | undefined>();
  const [reservedEvent, setReservedEvent] = useState<Event>();
  const [modalStats, setModalStats] = useState<ModalStatsType>('open');

  const { Modal: ModalA, openModal: openModalA, closeModal: closeModalA } = useModal('root');
  const { Modal: ModalB, openModal: openModalB, closeModal: closeModalB } = useModal('root');

  // fetch appointment by property id
  useEffect(() => {
    if (!propertyId) return; //prevent consume endpoint, if the propertyId is undefined

    const fetchAppointmentProperty = async (): Promise<AppointmentModelPagedResult | undefined> => {
      if (!connectSession) return;
      const serviceResponse = await getListOfAppointmentsByPropertyId(connectSession, propertyId);

      if (serviceResponse) setAppointmentProperty(serviceResponse);
    };

    if (connectSession) fetchAppointmentProperty();
  }, [connectSession, propertyId]);

  //   toggle active modal
  const openModalProperty = (id: SubTableAppointmentProps['id']): void => {
    openModalA();
    setPropertyId(id);
  };

  //   toggle close modal
  const closeModalProperty = (): void => {
    closeModalA();
    setPropertyId(undefined);
    setAppointmentProperty(undefined);
    setModalStats('open');
  };

  //   toggle reserved
  const openReservedCalendar = (data): void => {
    setReservedEvent(data);
    setModalStats('reserving');
    console.log(data);
    // make new view with new negotiator
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
          <Button className='el-ml6' intent='secondary' onClick={() => openModalProperty(id)}>
            Book Now
          </Button>
        </FlexContainer>
      </CardWrap>
      <ModalA title='Appointment Title Template' onModalClose={closeModalProperty}>
        {modalStats === 'open' ? (
          <ModalAppointment events={appointmentProperty?._embedded} setReservedModalOpen={openReservedCalendar} />
        ) : (
          <>
            <p>make new modal with reserved event data here (including the calendar and the form for user)</p>
            <p>do fetch data from negotiator (with property id state)</p>
            <p>make new button, with callback new JSOn data</p>
          </>
        )}
      </ModalA>
    </>
  );
};

export default SubTableAppointment;
