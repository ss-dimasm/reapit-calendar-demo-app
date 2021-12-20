import React, { FC, ReactElement, useEffect, useState } from 'react';

import { useReapitConnect } from '@reapit/connect-session';
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions';
import { Loader, Pagination } from '@reapit/elements';

import { reapitConnectBrowserSession } from '../../core/connect-session';
import { getListingsOfProperties } from '../../platform-api/propertyResource';

import SearchBar from '../ui/appoInt/SearchBar';
import TableAppointment from '../ui/appoInt/TableAppointment';
import { NotFound } from '../ui/appoInt/NotFound';

type CalendarProps = {};
type PageNumberProps = number;
export type SearchParamsType = string;
export type PropertyModelPagedResultVamp = PropertyModelPagedResult | undefined;

const Calendar: FC<CalendarProps> = (): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

  const [searchParams, setSearchParams] = useState<SearchParamsType>('');
  const [currentPageNumber, setCurrentPageNumber] = useState<PageNumberProps>(1);
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
      }
    };

    if (connectSession) {
      fetchPagedProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession, searchParams, currentPageNumber]);

  // Search Property Button
  const searchNewList = (params) => {
    setSearchParams(params);
  };

  /**
   * Render
   */

  if (propertiesData === undefined) {
    return <Loader label='Wait' />;
  }

  if (propertiesData?.totalCount === 0) {
    return (
      <>
        <SearchBar searchNewParams={searchNewList} />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <SearchBar searchNewParams={searchNewList} />
      <TableAppointment propertyData={propertiesData} searchParams={searchParams} />
      <Pagination
        className='el-mt6 el-pt6'
        callback={setCurrentPageNumber}
        currentPage={currentPageNumber}
        numberPages={propertiesData?.totalPageCount || 1}
      />
    </>
  );
};

export default Calendar;
