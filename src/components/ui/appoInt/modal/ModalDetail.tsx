import React, { ReactElement, FC } from 'react'

import {
  Button,
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  CardWrap,
  FlexContainer,
  Icon,
  Subtitle,
} from '@reapit/elements'

import { RecoverImagePropertyIfEmpty } from '../../../../utils/ModalDetailUtils'
import { ModalDetailType } from '../../../../interfaces/appointmentInterfaces'

const ModalDetail: FC<ModalDetailType> = (props): ReactElement => {
  const { changeStep, propertyData, propertyImageData, negotiatorData } = props

  if (!negotiatorData?.id)
    return (
      <div className="el-flex el-flex-justify-center">
        <Subtitle>No negotiator found, We can`&apos;t proceed further</Subtitle>
      </div>
    )

  // return image source and image alt based condition of data property image
  const photoSource = RecoverImagePropertyIfEmpty(propertyImageData)
  return (
    <>
      <FlexContainer>
        <img
          height={250}
          width={'50%'}
          src={photoSource.imageSource}
          alt={photoSource.imageAlt}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            marginRight: '10px',
          }}
        />
        <div style={{ width: '100%', position: 'relative' }}>
          <CardWrap>
            <FlexContainer>
              <CardListItem className="el-px3">
                <CardListIcon>
                  <Icon icon="houseInfographic" />
                </CardListIcon>
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>Bed Rooms</CardListItemTextPrimary>
                  <CardListItemTextSecondary>
                    {propertyData?.bedrooms}
                  </CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
              <CardListItem className="el-px3">
                <CardListIcon>
                  <Icon icon="houseInfographic" />
                </CardListIcon>
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>Bath Rooms</CardListItemTextPrimary>
                  <CardListItemTextSecondary>
                    {propertyData?.bathrooms}
                  </CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
            </FlexContainer>
          </CardWrap>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
            <CardListItem>
              <CardListIcon>
                <Icon icon="usernameSystem" />
              </CardListIcon>
              <CardListItemTextWrap>
                <CardListItemTextPrimary>Agent</CardListItemTextPrimary>
                <CardListItemTextSecondary>
                  {negotiatorData.name}
                </CardListItemTextSecondary>
              </CardListItemTextWrap>
            </CardListItem>
            <Button
              intent="critical"
              className="el-mt4"
              chevronRight
              onClick={() => changeStep('forward')}
            >
              Make an Appointment
            </Button>
          </div>
        </div>
      </FlexContainer>
    </>
  )
}

export default ModalDetail
