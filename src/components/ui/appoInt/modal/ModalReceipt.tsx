import { BodyText, Button, FlexContainer, Title } from '@reapit/elements'
import moment from 'moment'
import React, { FC, ReactElement } from 'react'
import { ModalReceiptType } from '../../../../interfaces/appointmentInterfaces'

const ModalReceipt: FC<ModalReceiptType> = (props): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { negotiatorData, finalReservedAppointment, closeModalProperty } = props
  // show information that email already sent to email
  const text = `We have already serve your appointment date with ${
    negotiatorData?.name
  } as the Agent from ${moment(finalReservedAppointment?.start).format(
    'hh:mm:ss A - dddd, D MMMM YYYY'
  )} until ${moment(finalReservedAppointment?.end).format(
    'hh:mm:ss A - dddd, D MMMM YYYY'
  )}.`
  return (
    <>
      <Title hasCenteredText hasBoldText>
        SUCCESS !
      </Title>
      <BodyText>{text}</BodyText>
      <BodyText>
        For further information, we have sent email about the details.
      </BodyText>
      <BodyText>
        If you have any questions, feel free to contact us at
        dimas.m@softwareseni.com
      </BodyText>
      <FlexContainer isFlexJustifyEnd>
        <Button
          intent="critical"
          chevronRight
          onClick={() => closeModalProperty()}
        >
          Finish
        </Button>
      </FlexContainer>
    </>
  )
}

export default ModalReceipt
