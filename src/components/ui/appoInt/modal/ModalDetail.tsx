import React, { ReactElement, useState, FC } from 'react';
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
  Loader,
  Subtitle,
} from '@reapit/elements';
import {
  ChangeCurrentStepType,
  NegotiatorDataType,
  PropertyDataType,
  PropertyImageDataType,
} from '../SubTableAppointment';

type ModalDetailType = {
  propertyData: PropertyDataType;
  propertyImageData: PropertyImageDataType;
  negotiatorData: NegotiatorDataType | undefined;
  changeStep: (status: ChangeCurrentStepType) => void;
};

const ModalDetail: FC<ModalDetailType> = (props): ReactElement => {
  const { changeStep, propertyData, propertyImageData, negotiatorData } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading)
    return (
      <div className='el-flex el-flex-justify-center'>
        <Loader label='please wait...' />
      </div>
    );

  if (!negotiatorData?.id)
    return (
      <div className='el-flex el-flex-justify-center'>
        <Subtitle>No negotiator found, We can't proceed further</Subtitle>
      </div>
    );

  let imagesSource;
  let imageAlt;
  if (propertyImageData?.totalCount === 0) {
    imagesSource = 'https://i.stack.imgur.com/6M513.png';
    imageAlt = 'not-found';
  } else {
    imagesSource = propertyImageData?._embedded?.[0]?.url;
    imageAlt = propertyImageData?._embedded?.[0]?.caption;
  }

  return (
    <>
      <FlexContainer>
        <img
          height={250}
          width={'50%'}
          src={imagesSource}
          alt={imageAlt}
          style={{ objectFit: 'cover', objectPosition: 'center', marginRight: '10px' }}
        />
        <div style={{ width: '100%', position: 'relative' }}>
          <CardWrap>
            <FlexContainer>
              <CardListItem className='el-px3'>
                <CardListIcon>
                  <Icon icon='houseInfographic' />
                </CardListIcon>
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>Bed Rooms</CardListItemTextPrimary>
                  <CardListItemTextSecondary>{propertyData?.bedrooms}</CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
              <CardListItem className='el-px3'>
                <CardListIcon>
                  <Icon icon='houseInfographic' />
                </CardListIcon>
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>Bath Rooms</CardListItemTextPrimary>
                  <CardListItemTextSecondary>{propertyData?.bathrooms}</CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
            </FlexContainer>
          </CardWrap>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
            <CardListItem>
              <CardListIcon>
                <Icon icon='usernameSystem' />
              </CardListIcon>
              <CardListItemTextWrap>
                <CardListItemTextPrimary>Agent</CardListItemTextPrimary>
                <CardListItemTextSecondary>{negotiatorData.name}</CardListItemTextSecondary>
              </CardListItemTextWrap>
            </CardListItem>
            <Button intent='critical' className='el-mt4' onClick={() => changeStep('forward')}>
              Make an Appointment
            </Button>
          </div>
        </div>
      </FlexContainer>
    </>
  );
};

export default ModalDetail;
