import React, { FC, ReactElement, useState } from 'react'
import { Input, Subtitle, Button, FlexContainer } from '@reapit/elements'

interface SidebarCompaniesProps {
  searchFn?: any
}
const SidebarCompanies: FC<SidebarCompaniesProps> = (
  props: SidebarCompaniesProps
): ReactElement => {
  const { searchFn } = props

  const [companiesStatId, setCompaniesStatId] = useState<string | undefined>()

  // change state
  const changeIdStat = (ev: React.FormEvent<HTMLInputElement>): void => {
    const value = ev.currentTarget.value
    setCompaniesStatId(value)
  }

  const submitIdStat = (): void => {
    searchFn(companiesStatId)
  }

  return (
    <>
      <Subtitle hasBoldText>Search an Company</Subtitle>
      <FlexContainer isFlexJustifyStart>
        <Input
          type="text"
          placeholder="Search By Id"
          className="el-w1"
          onKeyUp={changeIdStat}
        />
      </FlexContainer>
      <FlexContainer isFlexJustifyBetween className="el-mt6">
        <Button onClick={submitIdStat}>Submit</Button>
      </FlexContainer>
    </>
  )
}

export default SidebarCompanies
