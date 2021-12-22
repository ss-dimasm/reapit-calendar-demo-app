import React, { ReactElement, useEffect, useState, FC } from 'react';

import { useReapitConnect } from '@reapit/connect-session';
import { NegotiatorModel, PropertyImageModelPagedResult, PropertyModel } from '@reapit/foundations-ts-definitions';

import { reapitConnectBrowserSession } from '../../../../core/connect-session';
import { getNegotiatorDataByNegotiatorId } from '../../../../platform-api/negotiatorResource';
import { getPropertyDataByPropertyId, getPropertyImagesByPropertyId } from '../../../../platform-api/propertyResource';
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
import { ChangeCurrentStepType } from '../SubTableAppointment';

type ModalDetailType = {
  propertyId: PropertyModel['id'];
  negotiatorId: PropertyModel['negotiatorId'];
  changeStep: (status: ChangeCurrentStepType) => void;
};

type PropertyDataType = PropertyModel | undefined;
type PropertyImageDataType = PropertyImageModelPagedResult | undefined;
type NegotiatorDataType = NegotiatorModel | undefined;

const ModalDetail: FC<ModalDetailType> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

  const { changeStep, propertyId, negotiatorId } = props;

  const [propertyData, setPropertyData] = useState<PropertyDataType>(undefined);
  const [propertyImageData, setPropertyImageData] = useState<PropertyImageDataType>(undefined);
  const [negotiatorData, setNegotiatorData] = useState<NegotiatorDataType>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!propertyId || !negotiatorId) return;

    const fetchNegotiatorDataByNegotiatorId = async (): Promise<NegotiatorDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getNegotiatorDataByNegotiatorId(connectSession, negotiatorId);

      if (serviceResponse) setNegotiatorData(serviceResponse);
    };

    // get property data by id
    const fetchPropertyDataByPropertyId = async (): Promise<PropertyDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getPropertyDataByPropertyId(connectSession, propertyId);

      if (serviceResponse) setPropertyData(serviceResponse);
    };

    //   get property data image
    const fetchPropertyDataImagesByPropertyId = async (): Promise<PropertyImageDataType> => {
      if (!connectSession) return;

      const serviceResponse = await getPropertyImagesByPropertyId(connectSession, propertyId);

      if (serviceResponse) {
        setPropertyImageData(serviceResponse);
        setIsLoading(false);
      }
    };

    if (connectSession) {
      fetchNegotiatorDataByNegotiatorId();
      fetchPropertyDataByPropertyId();
      fetchPropertyDataImagesByPropertyId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession]);

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
