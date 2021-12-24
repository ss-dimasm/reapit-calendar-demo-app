import React, { useState, FC, ReactElement, MouseEventHandler } from 'react';

import { Button, FlexContainer, InputGroup, useSnack } from '@reapit/elements';

import { ChangeCurrentStepType, UserInfoType } from '../SubTableAppointment';

type ModalIdentityType = {
  changeStep: (status: ChangeCurrentStepType) => void;
  changeUserInfo: (data: UserInfoType) => void;
};

type ChangeDataType = 'name' | 'mail' | 'phone' | 'purpose';
type ChangeDataValue = string | undefined;
type FormFormatType = string | undefined;

const ModalIdentity: FC<ModalIdentityType> = (props): ReactElement => {
  const { changeStep, changeUserInfo } = props;

  const { custom } = useSnack();

  const [nameUser, setNameUser] = useState<FormFormatType>(undefined);
  const [mailUser, setMailUser] = useState<FormFormatType>(undefined);
  const [phoneUser, setPhoneUser] = useState<FormFormatType>(undefined);
  const [purposeUser, setPurposeUser] = useState<FormFormatType>(undefined);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  //   change data
  const changeData = (type: ChangeDataType, value: ChangeDataValue) => {
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

  // fill with dummy data
  const fillUpWithDummyData: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.currentTarget.disabled = true;

    const userData: UserInfoType = {
      name: 'Dimas Bagus P',
      email: 'dimas.m@softwareseni.com',
      phone: '621234567890',
      purpose: 'Look Around',
    };

    // set up local state
    changeData('name', userData.name);
    changeData('mail', userData.email);
    changeData('phone', userData.phone);
    changeData('purpose', userData.purpose);

    // cb to parent state
    changeUserInfo(userData);

    // set notification to user
    custom(
      {
        text: 'You will redirect in a seconds',
        icon: 'infoSolidSystem',
        intent: 'success',
      },
      2750
    );

    setTimeout(() => {
      changeStep('forward');
    }, 3000);
  };

  //   submit form
  const submitUserInfoForm = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

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
      <FlexContainer isFlexJustifyBetween className='el-mt6'>
        <Button intent='success' onClick={fillUpWithDummyData}>
          Fill Up With Dummy Data
        </Button>
        <Button intent='critical' onClick={submitUserInfoForm} chevronRight disabled={isButtonActive}>
          Next
        </Button>
      </FlexContainer>
    </>
  );
};

export default ModalIdentity;
