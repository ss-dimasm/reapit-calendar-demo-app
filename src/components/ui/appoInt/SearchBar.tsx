import { Button, FlexContainer, Icon, Input, InputAddOn, InputGroup, Label, Title } from '@reapit/elements';
import React, { FC, ReactElement, useState } from 'react';

type SearchBarProps = {
  searchNewParams: (params) => void;
};
type SearchQueryProps = string | undefined;

const SearchBar: FC<SearchBarProps> = (props: SearchBarProps): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<SearchQueryProps>(undefined);
  const { searchNewParams } = props;

  return (
    <>
      <Title hasCenteredText hasBoldText>
        Book an Appointment for a Property Now!
      </Title>
      <FlexContainer isFlexJustifyCenter className='el-w8 el-mx-auto'>
        <InputGroup className='el-w7 el-mb6 el-pr8'>
          <Input
            id='location'
            type='text'
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder='Search by Address'
          />
          <Icon icon='geoLocationSolidSystem' />
          <Label htmlFor='location' />
          <InputAddOn intent='low'>(e.g Bushmead Avenue)</InputAddOn>
        </InputGroup>
        <Button intent='critical' onClick={() => searchNewParams(searchQuery)}>
          Search an Property
        </Button>
      </FlexContainer>
    </>
  );
};

export default SearchBar;
