import React, { FC, ReactElement, useState, useEffect } from 'react'

import { Button, FlexContainer } from '@reapit/elements'
import {
  AppointmentModelPagedResult,
  NegotiatorModel,
} from '@reapit/foundations-ts-definitions'
import { PageLocationType } from '../../../pages/negotiator'
import AgentInformation from './AgentInformation'
import AgentCalendar from './AgentCalendar'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { getAppointmentDateByNegotiatorId } from '../../../../platform-api/negotiatorResource'

type AgentDetailsType = {
  singleNegotiatorId: NegotiatorModel['id'] | undefined
  singleNegotiatorData: NegotiatorModel | undefined
  backToResultPage: (location: PageLocationType) => void
}

const AgentDetails: FC<AgentDetailsType> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { singleNegotiatorId, singleNegotiatorData, backToResultPage } = props

  const [appointmentsData, setAppointmentsData] = useState<
    AppointmentModelPagedResult | undefined
  >(undefined)

  useEffect(() => {
    if (!connectSession) return
    const getAppointmentsDataBasedNegotiatorId =
      async (): Promise<AppointmentModelPagedResult | void> => {
        const serviceResponse = await getAppointmentDateByNegotiatorId(
          connectSession,
          singleNegotiatorId
        )
        if (serviceResponse) setAppointmentsData(serviceResponse)
      }

    if (connectSession) getAppointmentsDataBasedNegotiatorId()
  }, [connectSession])
  // plot data to 4 section
  // 1. Agent Details (done)
  // 2. Agent Company From
  // 3. Agent Appointment Date (can view then decided to delete)
  // 4. Agent Handled Property
  return (
    <>
      <FlexContainer style={{ marginBottom: '1rem' }}>
        <Button
          chevronLeft
          intent="primary"
          onClick={() => backToResultPage('result')}
        >
          Back to Result Page
        </Button>
      </FlexContainer>
      <FlexContainer isFlexJustifyBetween>
        <AgentInformation singleAgentInformation={singleNegotiatorData} />
        <AgentCalendar
          negotiatorId={singleNegotiatorId}
          appointmentData={appointmentsData}
        />
      </FlexContainer>
    </>
  )
}

export default AgentDetails
