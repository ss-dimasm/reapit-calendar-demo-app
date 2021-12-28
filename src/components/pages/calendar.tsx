import React, { FC, ReactElement, useEffect, useState } from 'react';

import { useReapitConnect } from '@reapit/connect-session';
import { Loader, Pagination } from '@reapit/elements';

import { reapitConnectBrowserSession } from '../../core/connect-session';
import { getListingsOfProperties } from '../../platform-api/propertyResource';

import SearchBar from '../ui/appoInt/SearchBar';
import TableAppointment from '../ui/appoInt/TableAppointment';
import { NotFound } from '../ui/appoInt/NotFound';

import { PropertyModelPagedResultVamp } from '../../interfaces/appointmentInterfaces';

const Calendar: FC = (): ReactElement => {
	const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

	const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
	const [searchParams, setSearchParams] = useState<string>('');
	const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
	const [propertiesData, setPropertiesData] = useState<PropertyModelPagedResultVamp>(undefined);

	useEffect(() => {
		const fetchPagedProperties = async (): Promise<PropertyModelPagedResultVamp> => {
			if (!connectSession) return;

			const propertyData = {
				pageNumber: currentPageNumber,
				address: searchParams,
			};
			const serviceResponse = await getListingsOfProperties(connectSession, propertyData);

			if (serviceResponse) {
				setPropertiesData(serviceResponse);
				setCurrentPageNumber((number) => number++);
				if (isPageLoading) {
					setIsPageLoading(false);
				}
			}
		};

		if (connectSession) {
			fetchPagedProperties();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectSession, searchParams, currentPageNumber]);

	// Search Property Button
	const searchNewList = (params): void => {
		setCurrentPageNumber(1);
		setSearchParams(params);
	};

	const resetPropertiesData = (): void => {
		setPropertiesData(undefined);
	};

	if (isPageLoading) return <Loader label='Page wait...' fullPage />;
	// while properties data is still load / unavailable
	if (propertiesData === undefined) {
		return (
			<>
				<SearchBar searchNewParams={searchNewList} resetPropertiesData={resetPropertiesData} />
				<Loader label='Getting data...' fullPage />;
			</>
		);
	}

	// while properties data is not available
	if (propertiesData?.totalCount === 0) {
		return (
			<>
				<SearchBar searchNewParams={searchNewList} resetPropertiesData={resetPropertiesData} />
				<NotFound />
			</>
		);
	}

	const changePageNumber = (e): void => {
		if (propertiesData?.totalPageCount) {
			if (e <= propertiesData.totalPageCount) {
				setCurrentPageNumber(e);
			}
		}
	};
	// while properties data is ready
	return (
		<>
			<SearchBar searchNewParams={searchNewList} resetPropertiesData={resetPropertiesData} />
			<TableAppointment propertyData={propertiesData} searchParams={searchParams} />
			<Pagination
				className='el-mt6 el-pt6'
				onClick={() => setPropertiesData(undefined)}
				callback={(e) => changePageNumber(e)}
				currentPage={currentPageNumber}
				numberPages={propertiesData?.totalPageCount || 1}
			/>
		</>
	);
};

export default Calendar;
