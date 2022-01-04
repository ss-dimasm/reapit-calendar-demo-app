import {
  CardImageWrap,
  CardListHeading,
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  CardListMainWrap,
  CardListSubHeading,
  CardWrap,
  Icon,
} from '@reapit/elements'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import React, { FC, ReactElement } from 'react'

type AgentInformationType = {
  singleAgentInformation: NegotiatorModel | undefined
}
const AgentInformation: FC<AgentInformationType> = (props): ReactElement => {
  const { singleAgentInformation } = props
  return (
    <CardWrap style={{ width: '20%' }}>
      <CardListHeading style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Agent
      </CardListHeading>
      <CardImageWrap style={{ width: '100%', height: '250px' }}>
        <img src="https://via.placeholder.com/52x52.svg" alt="asd" />
      </CardImageWrap>
      <CardListMainWrap>
        <CardListSubHeading className="el-has-bold-text">
          {singleAgentInformation?.name}
        </CardListSubHeading>
      </CardListMainWrap>
      <CardListItem>
        <CardListIcon>
          <Icon icon="phoneSystem" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Phone</CardListItemTextPrimary>
          <CardListItemTextSecondary>
            {singleAgentInformation?.mobilePhone ?? '-'}
          </CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      <CardListItem>
        <CardListIcon>
          <Icon icon="emailSystem" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Email Address</CardListItemTextPrimary>
          <CardListItemTextSecondary>
            {singleAgentInformation?.email ?? '-'}
          </CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
    </CardWrap>
  )
}

export default AgentInformation
