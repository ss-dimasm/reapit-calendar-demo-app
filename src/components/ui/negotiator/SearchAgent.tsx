import { Button, FlexContainer, InputGroup, Title, useSnack } from '@reapit/elements';
import React, { FC, ReactElement, useState } from 'react';

type SearchAgentProps = {
	changeSearchParams: (data: string | undefined) => void;
};
const SearchAgent: FC<SearchAgentProps> = (props): ReactElement => {
	const { changeSearchParams } = props;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentSearchParams, setCurrentSearchParams] = useState<string | undefined>(undefined);

	const { custom } = useSnack();

	// search parameter to change the global state
	const changeSearchParamsInside: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
		e.preventDefault();
		currentSearchParams
			? changeSearchParams(currentSearchParams)
			: custom({
					text: 'you must provided the keywords!',
					icon: 'warningSolidSystem',
					intent: 'critical',
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  });
	};

	return (
		<form style={{ height: '100%' }}>
			<FlexContainer isFlexAlignCenter isFlexJustifyCenter style={{ height: '50%' }}>
				<div
					className='el-w5 el-py8 el-px10'
					style={{ height: 'max-content', backgroundColor: '#262f69', borderRadius: '20px' }}>
					<Title hasBoldText style={{ color: '#ffffff' }}>
						Search Agents
					</Title>
					<InputGroup
						icon='usernameSystem'
						label='Search agent by name'
						type='text'
						intent='primary'
						onChange={(e) => setCurrentSearchParams(e.currentTarget.value)}
						required
					/>
					<FlexContainer className='el-mt6' isFlexJustifyEnd>
						<Button intent='critical' chevronRight onClick={changeSearchParamsInside}>
							Search
						</Button>
					</FlexContainer>
				</div>
			</FlexContainer>
		</form>
	);
};

export default SearchAgent;
