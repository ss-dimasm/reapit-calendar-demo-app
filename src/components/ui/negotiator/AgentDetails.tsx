import React, { FC, ReactElement } from 'react';

import { Button } from '@reapit/elements';
import { NegotiatorModel } from '@reapit/foundations-ts-definitions';
import { PageLocationType } from '../../pages/negotiator';

type AgentDetailsType = {
	singleNegotiatorId: NegotiatorModel['id'] | undefined;
	singleNegotiatorData: NegotiatorModel | undefined;
	backToResultPage: (location: PageLocationType) => void;
};

const AgentDetails: FC<AgentDetailsType> = (props): ReactElement => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { singleNegotiatorId, singleNegotiatorData, backToResultPage } = props;
	// console.log(singleNegotiatorId);
	// console.log(singleNegotiatorData);

	// plot data to 4 section
	// 1. Agent Details
	// 2. Agent Company From
	// 3. Agent Appointment Date
	// 4. Agent Handled Property
	return (
		<>
			<Button chevronLeft intent='primary' onClick={() => backToResultPage('result')}>
				Back to Result Page
			</Button>
		</>
	);
};

export default AgentDetails;
