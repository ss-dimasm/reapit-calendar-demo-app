import React, { useState, FC, ReactElement } from 'react';

import { Button, FlexContainer, InputGroup } from '@reapit/elements';

import { ChangeCurrentStepType, UserInfoType } from '../SubTableAppointment';

type ModalIdentityType = {
  changeStep: (status: ChangeCurrentStepType) => void;
  changeUserInfo: (data: UserInfoType) => void;
};

const ModalIdentity: FC<ModalIdentityType> = (props): ReactElement => {
  const { changeStep, changeUserInfo } = props;

  const [nameUser, setNameUser] = useState<string | undefined>(undefined);
  const [mailUser, setMailUser] = useState<string | undefined>(undefined);
  const [phoneUser, setPhoneUser] = useState<string | undefined>(undefined);
  const [purposeUser, setPurposeUser] = useState<string | undefined>(undefined);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  //   change data
  const changeData = (type, value) => {
    switch (type) {
      case 'name':
        setNameUser(value);
        break;
      case 'mail':
        setMailUser(value);
        break;
      case 'phone':
        setPhoneUser(value);
        break;
      case 'purpose':
        setPurposeUser(value);
    }

    if (nameUser && mailUser && phoneUser && purposeUser) {
      setIsButtonActive(false);
    }
  };
  //   submit form
  const submitForm = (e: React.FormEvent): void => {
    const userData: UserInfoType = {
      name: nameUser,
      email: mailUser,
      phone: phoneUser,
      purpose: purposeUser,
    };

    changeUserInfo(userData);
    changeStep('forward');
  };
  return (
    <>
      <FlexContainer className='el-w6 el-mx-auto' style={{ flexDirection: 'column' }}>
        <InputGroup
          icon='usernameSystem'
          label='Please enter your name'
          type='text'
          onChange={(e) => changeData('name', e.target.value)}
          defaultValue={nameUser}
          required
        />
        <InputGroup
          icon='emailSystem'
          label='Please enter mail address'
          type='email'
          onChange={(e) => changeData('mail', e.target.value)}
          defaultValue={mailUser}
          required
        />
        <InputGroup
          icon='phoneSystem'
          label='Please enter telephone number'
          type='tel'
          onChange={(e) => changeData('phone', e.target.value)}
          defaultValue={phoneUser}
          required
        />
        <InputGroup
          icon='emailSystem'
          label='What you would do in here?'
          type='text'
          onChange={(e) => changeData('purpose', e.target.value)}
          defaultValue={purposeUser}
          required
        />
      </FlexContainer>
      <FlexContainer isFlexJustifyEnd className='el-mt6'>
        <Button intent='critical' onClick={submitForm} disabled={isButtonActive}>
          Next
        </Button>
      </FlexContainer>
    </>
  );
};

export default ModalIdentity;
