import React, { FC, ReactElement } from 'react';

import {
  FlexContainer,
  Icon,
  Input,
  InputGroup,
  Label,
  Loader,
  Subtitle,
  BodyText,
  StatusIndicator,
} from '@reapit/elements';

import { CompanyIdDataType } from './ListCompaniesData';

type ModalSingleCompanyDataProp = {
  data: CompanyIdDataType;
};

const ModalSingleCompanyData: FC<ModalSingleCompanyDataProp> = (props: ModalSingleCompanyDataProp): ReactElement => {
  const { data } = props;

  // loading indicator if the data still unavailable
  if (data === undefined) {
    return (
      <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
        <Loader label='loading' />
      </FlexContainer>
    );
  }

  const notes = data.notes || '-';
  const email = data.email || '-';
  const phone = data.workPhone || data.mobilePhone || '-';
  const date = data.created?.substring(0, 10) || '-';
  const status = data.active ? 'success' : 'low';

  const addressLine1 = `${data.address?.line1 ? data.address.line1 : ''}`;
  const addressLine2 = `${data.address?.line2 ? +', ' + data.address.line2 + '- ' : ''}`;
  const addressPostCode = `${data.address?.postcode}`;
  const address = addressLine1 + addressLine2 + addressPostCode;

  return (
    <>
      <Subtitle hasBoldText>
        Information {data.name} - {data.branch} (<StatusIndicator intent={status} />)
      </Subtitle>
      <div>
        <Subtitle>Description:</Subtitle>
        <BodyText>{notes}</BodyText>
      </div>
      <div>
        <Subtitle>Contact</Subtitle>
        <FlexContainer>
          <InputGroup>
            <Input id='email' type='email' defaultValue={email} disabled />
            <Icon icon='emailSystem' />
            <Label htmlFor='email'>Email</Label>
          </InputGroup>
          <InputGroup>
            <Input id='phone' type='telephone' defaultValue={phone} disabled />
            <Icon icon='phoneSystem' />
            <Label htmlFor='phone'>Phone</Label>
          </InputGroup>
          <InputGroup>
            <Input id='date' type='date' defaultValue={date} disabled />
            <Icon icon='calendarSystem' />
            <Label htmlFor='date'>Join Date</Label>
          </InputGroup>
        </FlexContainer>
        <InputGroup className='el-mt6'>
          <Input id='location' type='text' defaultValue={address} disabled />
          <Icon icon='geoLocationSolidSystem' />
          <Label htmlFor='location'>Address</Label>
        </InputGroup>
      </div>
    </>
  );
};

export default ModalSingleCompanyData;
