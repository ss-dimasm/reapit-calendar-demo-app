import React, { FC, ReactElement, useEffect, useState } from 'react';

import { useReapitConnect } from '@reapit/connect-session';
import { reapitConnectBrowserSession } from '../../core/connect-session';
import SearchAgent from '../ui/negotiator/SearchAgent';
import Loading from '../ui/utils/Loading';
import { NegotiatorModel, NegotiatorModelPagedResult } from '@reapit/foundations-ts-definitions';
import {
	getNegotiatorDataByNegotiatorId,
	getNegotiatorDataByNegotiatorName,
} from '../../platform-api/negotiatorResource';
import AgentResults from '../ui/negotiator/AgentResults';
import { useSnack } from '@reapit/elements';
import AgentDetails from '../ui/negotiator/AgentDetails';

type NegotiatorProps = {};

export type PageLocationType = 'search' | 'result' | 'details';
const Negotiator: FC<NegotiatorProps> = (): ReactElement => {
	const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

	const [pageLocation, setPageLocation] = useState<PageLocationType>('search');
	const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
	const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
	const [negotiatorsListdata, setNegotiatorsListData] = useState<NegotiatorModelPagedResult | undefined>(undefined);
	const [selectedNegotiatorId, setSelectedNegotiatorId] = useState<string | undefined>(undefined);
	const [singleNegotiatorData, setSingleNegotiatorData] = useState<NegotiatorModel | undefined>(undefined);

	useEffect(() => {
		if (!connectSession) return;
		const getNegotiatorByName = async (): Promise<NegotiatorModelPagedResult | undefined> => {
			if (!connectSession || !searchQuery || selectedNegotiatorId) return;
			console.log('negotiator name called');
			const serviceResponse = await getNegotiatorDataByNegotiatorName(connectSession, searchQuery);
			if (serviceResponse) {
				if (serviceResponse.totalCount === 0) {
					searchParamsNotFound();
					setIsPageLoading(false);
				} else {
					setNegotiatorsListData(serviceResponse);
					setPageLocation('result');
					setIsPageLoading(false);
				}
			}
		};

		const getNegotiatorById = async (): Promise<NegotiatorModel | undefined> => {
			if (!selectedNegotiatorId || !connectSession) return;
			const serviceResponse = await getNegotiatorDataByNegotiatorId(connectSession, selectedNegotiatorId);
			if (serviceResponse) {
				setSingleNegotiatorData(serviceResponse);
				setPageLocation('details');
				setIsPageLoading(false);
			}
		};
		if (connectSession) {
			getNegotiatorByName();
			selectedNegotiatorId && getNegotiatorById();
		}
	}, [connectSession, searchQuery, selectedNegotiatorId]);

	const { custom } = useSnack();

	// Change Search Params
	const changeSearchParams = (data: string | undefined): void => {
		setSearchQuery(data);
		setIsPageLoading(true);
	};

	// show notification to user, if the agent not found
	const searchParamsNotFound = (): void => {
		custom({
			text: `Agent with name ${searchQuery} is not found`,
			icon: 'warningSolidSystem',
			intent: 'critical',
		});
		setSearchQuery(undefined);
	};
	// reset state data withouth page location
	const resetStateData = (): void => {
		setNegotiatorsListData(undefined);
		setSelectedNegotiatorId(undefined);
		setSearchQuery(undefined);
	};

	// change page location between 'search' | 'result' | 'summary'
	const changePageLocation = (location: PageLocationType): void => {
		switch (location) {
			case 'search':
				resetStateData();
				break;
			case 'details':
				setSingleNegotiatorData(undefined);
				setSelectedNegotiatorId(undefined);
				break;
			case 'result':
				setSingleNegotiatorData(undefined);
				setSelectedNegotiatorId(undefined);
		}
		setPageLocation(location);
	};

	const viewNegotiatorById = (negotiatorId: string | undefined): void => {
		setSelectedNegotiatorId(negotiatorId);
		setIsPageLoading(true);
	};

	// todo today
	// in the single negotiator data
	// user can check appointment date details (can delete and see the appointment)
	// can see the office, can see the properties that he handles
	// can see the data information

	if (isPageLoading) return <Loading text='Please wait...' isCenter isFullScreen />;

	if (pageLocation === 'search') {
		return (
			<>
				<SearchAgent changeSearchParams={changeSearchParams} />
			</>
		);
	}

	if (pageLocation === 'result') {
		return (
			<AgentResults
				searchQuery={searchQuery}
				agentsData={negotiatorsListdata}
				changePageLocation={changePageLocation}
				viewNegotiatorById={viewNegotiatorById}
			/>
		);
	}

	return (
		<AgentDetails
			singleNegotiatorId={selectedNegotiatorId}
			singleNegotiatorData={singleNegotiatorData}
			backToResultPage={changePageLocation}
		/>
	);
};

export default Negotiator;
