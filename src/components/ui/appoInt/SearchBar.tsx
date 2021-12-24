import { Button, FlexContainer, Icon, Input, InputAddOn, InputGroup, Label, Title } from '@reapit/elements';
import React, { FC, ReactElement, useState } from 'react';

type SearchBarProps = {
  searchNewParams: (params) => void;
  resetPropertiesData: () => void;
};

type SearchQueryProps = string | undefined;

const SearchBar: FC<SearchBarProps> = (props: SearchBarProps): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<SearchQueryProps>(undefined);
  const { searchNewParams, resetPropertiesData } = props;

  const searchNewProperties = (e: React.FormEvent): void => {
    e.preventDefault();

    resetPropertiesData();
    searchNewParams(searchQuery);
  };
  return (
    <>
      <Title hasCenteredText hasBoldText>
        Book an Appointment for a Property Now!
      </Title>
      <form onSubmit={(e) => searchNewProperties(e)}>
        <FlexContainer isFlexJustifyCenter className='el-w8 el-mx-auto'>
          <InputGroup className='el-w7 el-mb6 el-pr8'>
            <Input
              id='location'
              type='text'
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder='Search by Address'
            />
            <Icon icon='searchSystem' />
            <Label htmlFor='location' />
            <InputAddOn intent='low'>(e.g Bushmead Avenue)</InputAddOn>
          </InputGroup>
          <Button intent='critical'>Search an Property</Button>
        </FlexContainer>
      </form>
    </>
  );
};

export default SearchBar;
