import React, { useState, useEffect, FC } from 'react';

import { Loader, Subtitle, Title, Table } from '@reapit/elements';

import { useReapitConnect } from '@reapit/connect-session';
import { CompanyModelPagedResult } from '@reapit/foundations-ts-definitions';

import { reapitConnectBrowserSession } from '../../core/connect-session';
import { configurationCompaniesApiServices } from '../../platform-api/configuration-api';

import ListCompaniesHeaders from '../ui/companies/ListCompaniesHeaders';
import ListCompaniesData from '../ui/companies/ListCompaniesData';
import PagedPaginationResult from '../ui/PagedPaginationResult';

export type CompaniesProps = {};

export type CompaniesModelPagedVamp = CompanyModelPagedResult | undefined;
export type CompaniesDataPage = number | string | any;

const Companies: FC<CompaniesProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession);

  const [companiesData, setCompaniesData] = useState<CompaniesModelPagedVamp>();

  const [companiesDataPage, setCompaniesDataPage] = useState<CompaniesDataPage>(1);
  const [companiesDataUri, setCompaniesDataUri] = useState<Exclude<CompaniesDataPage, number>>();

  // called if the companies Data Page is changed
  useEffect(() => {
    const fetchCompaniesDataAgain = async (): Promise<CompaniesModelPagedVamp> => {
      if (!connectSession) return;
      const serviceResponse = await configurationCompaniesApiServices(connectSession, companiesDataUri);

      if (serviceResponse) {
        setCompaniesData(serviceResponse);
      }
    };

    if (connectSession) {
      fetchCompaniesDataAgain();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession, companiesDataPage]);

  // throw if still undefined
  if (companiesData === undefined) {
    return <Loader fullPage={true} label='fetching companies data' />;
  }

  // titles for table headers
  const titles = ['ID', 'Name', 'Branch', 'Action'];

  // OnChangeHandler Zone
  type OnChangePaginationHandlerProps = 'next' | 'prev';

  // onChange pagination handler
  const onChangePaginationHandler = (type: OnChangePaginationHandlerProps) => {
    if (companiesData?.totalPageCount !== undefined) {
      switch (type) {
        case 'next':
          if (companiesDataPage < companiesData?.totalPageCount) {
            setCompaniesDataPage((companiesDataPage) => companiesDataPage + 1);
            setCompaniesDataUri(companiesData?._links?.next?.href);
          }
          break;
        case 'prev':
          if (companiesDataPage > 1) {
            setCompaniesDataPage((companiesDataPage) => companiesDataPage - 1);
            setCompaniesDataUri(companiesData?._links?.last?.href);
          }
          break;
      }
    }
  };

  return (
    <>
      <Title>Companies</Title>
      <Subtitle>There are {companiesData.totalCount} Companies that already registered</Subtitle>
      <Table>
        <ListCompaniesHeaders titles={titles} />
        <ListCompaniesData data={companiesData._embedded} />
      </Table>
      <PagedPaginationResult
        totalPageCount={companiesData.totalPageCount}
        pageNumber={companiesData.pageNumber}
        pageSize={companiesData.pageSize}
        _links={companiesData._links}
        changeHandler={onChangePaginationHandler}
      />
    </>
  );
};

export default Companies;
