/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactElement, useState, useEffect } from 'react'
import {
  PropertyImageModelPagedResult,
  PropertyModel,
} from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import {
  getPropertyDataByPropertyId,
  getPropertyImagesByPropertyId,
} from '../../../../platform-api/propertyResource'
import Loading from '../../utils/Loading'
import { Button, FlexContainer, InputGroup } from '@reapit/elements'
import { RecoverImagePropertyIfEmpty } from '../../../../utils/ModalDetailUtils'
import {
  convertTimeToAssignedInput,
  identityLocationCoordinate,
  identityTheAddress,
} from '../../../../utils/modalSummaryUtils'

type AgentPropertyDataType = {
  propertyId: PropertyModel['id'] | undefined
  selectedAppointmentDate: any
}
const AgentPropertyData: FC<AgentPropertyDataType> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const { propertyId, selectedAppointmentDate } = props

  const [propertyData, setPropertyData] = useState<PropertyModel | undefined>(
    undefined
  )
  const [propertyImagesData, setPropertyImageData] = useState<
    PropertyImageModelPagedResult | undefined
  >(undefined)
  const [isPropertyLoading, setIsPropertyLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!connectSession) return

    const getPropertyDetailsDataByPropertyId =
      async (): Promise<PropertyModel | void> => {
        if (!propertyId) return
        const serviceResponse = await getPropertyDataByPropertyId(
          connectSession,
          propertyId
        )

        if (serviceResponse) {
          getPropertyImagesDetailsDataByPropertyId()
          setPropertyData(serviceResponse)
        }
      }

    const getPropertyImagesDetailsDataByPropertyId =
      async (): Promise<PropertyImageModelPagedResult | void> => {
        if (!propertyId) return
        const serviceResponse = await getPropertyImagesByPropertyId(
          connectSession,
          propertyId
        )

        if (serviceResponse) {
          setPropertyImageData(serviceResponse)
          setIsPropertyLoading(false)
        }
      }

    if (connectSession) {
      getPropertyDetailsDataByPropertyId()
    }
  }, [connectSession])

  if (isPropertyLoading)
    return <Loading text="Getting Property Information..." isCenter />

  const photoSource = RecoverImagePropertyIfEmpty(propertyImagesData)
  const propertyAddress = identityTheAddress(propertyData)
  const dateStart = convertTimeToAssignedInput(selectedAppointmentDate.start)
  const dateEnd = convertTimeToAssignedInput(selectedAppointmentDate.end)
  const coordinate = identityLocationCoordinate(propertyData)

  const openGoogleMap = (coordinate): Window | null => window.open(coordinate)
  return (
    <FlexContainer isFlexJustifyBetween>
      <div style={{ width: '45%' }}>
        <img
          alt={photoSource.imageAlt}
          src={photoSource.imageSource}
          style={{
            objectFit: 'cover',
            height: '250px',
            width: '100%',
          }}
        />
      </div>
      <div style={{ width: '50%' }}>
        <InputGroup
          icon="geoLocationSolidSystem"
          label="Address"
          defaultValue={propertyAddress}
        />
        <InputGroup
          icon="calendarSystem"
          label="From"
          type="datetime-local"
          disabled
          defaultValue={dateStart}
        />
        <InputGroup
          icon="calendarSystem"
          label="Until"
          type="datetime-local"
          disabled
          defaultValue={dateEnd}
        />
        <FlexContainer isFlexJustifyEnd className="el-mt6">
          <Button intent="primary" onClick={() => openGoogleMap(coordinate)}>
            Open in Google Maps
          </Button>
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}

export default AgentPropertyData
