import React, { FC, ReactElement } from 'react';

import {
	SmallText,
	Button,
	FlexContainer,
	Subtitle,
	CardWrap,
	CardImageWrap,
	CardHeadingWrap,
	CardHeading,
	CardListItem,
	CardListIcon,
	Icon,
	CardListItemTextPrimary,
	CardListItemTextSecondary,
	CardListItemTextWrap,
} from '@reapit/elements';
import { NegotiatorModel, NegotiatorModelPagedResult } from '@reapit/foundations-ts-definitions';

import { PageLocationType } from '../../pages/negotiator';

type AgentResultsType = {
	searchQuery: string | undefined;
	agentsData: NegotiatorModelPagedResult | undefined;
	changePageLocation: (location: PageLocationType) => void;
	viewNegotiatorById: (negotiatorId: string | undefined) => void;
};
const AgentResults: FC<AgentResultsType> = (props): ReactElement => {
	const { searchQuery, agentsData, changePageLocation, viewNegotiatorById } = props;

	// todo, infinite scroll :)
	return (
		<div>
			<FlexContainer className='el-mb8'>
				<Button chevronLeft intent='primary' onClick={() => changePageLocation('search')}>
					Back
				</Button>
				<FlexContainer isFlexJustifyCenter isFlexAlignCenter>
					<Subtitle hasNoMargin className='el-ml6'>
						Search Result with {searchQuery} as keywords
					</Subtitle>
					<SmallText className='el-ml2' hasNoMargin hasBoldText>
						({agentsData?.totalCount} result found)
					</SmallText>
				</FlexContainer>
			</FlexContainer>
			{/* BREAK */}
			<FlexContainer isFlexWrap isFlexJustifyCenter>
				{agentsData?._embedded?.map((agentData: NegotiatorModel): ReactElement => {
					return (
						<CardWrap key={agentData.id} className='el-m5 el-w2' onClick={() => viewNegotiatorById(agentData.id)}>
							<CardImageWrap style={{ width: '100%', height: '250px' }}>
								<img
									src={
										agentData.profileImageUrl ??
										'https://w7.pngwing.com/pngs/141/425/png-transparent-user-profile-computer-icons-avatar-profile-s-free-angle-rectangle-profile-cliparts-free-thumbnail.png'
									}
									alt={agentData.name}
									style={{ objectFit: 'cover', height: '175px', width: '175px' }}
								/>
							</CardImageWrap>
							<CardHeadingWrap>
								<CardHeading>{agentData.name}</CardHeading>
							</CardHeadingWrap>
							<CardListItem>
								<CardListIcon>
									<Icon icon='emailSystem' />
								</CardListIcon>
								<CardListItemTextWrap>
									<CardListItemTextPrimary>Mail</CardListItemTextPrimary>
									<CardListItemTextSecondary>{agentData.email ?? '-'}</CardListItemTextSecondary>
								</CardListItemTextWrap>
							</CardListItem>
						</CardWrap>
					);
				})}
			</FlexContainer>
		</div>
	);
};

export default AgentResults;
