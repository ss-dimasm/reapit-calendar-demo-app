import React, { useState, useEffect, FC, ReactElement } from 'react'

import {
  Loader,
  Subtitle,
  Title,
  Table,
  MainContainer,
  SecondaryNavContainer,
  PageContainer,
  FlexContainer,
  useSnack,
} from '@reapit/elements'

import { useReapitConnect } from '@reapit/connect-session'
import { CompanyModelPagedResult } from '@reapit/foundations-ts-definitions'

import { reapitConnectBrowserSession } from '../../core/connect-session'
import { configurationCompaniesApiServices } from '../../platform-api/configuration-api'

import ListCompaniesHeaders from '../ui/companies/ListCompaniesHeaders'
import ListCompaniesData from '../ui/companies/ListCompaniesData'
import PagedPaginationResult from '../ui/PagedPaginationResult'
import SidebarCompanies from '../ui/companies/SidebarCompanies'

type CompaniesProps = {}
type CompaniesDataPage = string | number | any
type CompaniesDataPageUriProps = Exclude<CompaniesDataPage, number>
type OnChangePaginationHandlerProps = 'next' | 'prev'
type SearchCompaniesByIdProps = string | undefined

export type CompaniesModelPagedVamp = CompanyModelPagedResult | undefined

const Companies: FC<CompaniesProps> = (): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [companiesData, setCompaniesData] = useState<CompaniesModelPagedVamp>()
  const [companiesDataPage, setCompaniesDataPage] =
    useState<CompaniesDataPage>(1)
  const [companiesDataUri, setCompaniesDataUri] =
    useState<CompaniesDataPageUriProps>()
  const [companiesSearchId, setCompaniesSearchId] =
    useState<SearchCompaniesByIdProps>()

  const { info } = useSnack()

  // called if the companies Data Page is changed
  useEffect(() => {
    const fetchCompaniesDataAgain =
      async (): Promise<CompaniesModelPagedVamp> => {
        if (!connectSession) return
        const serviceResponse = await configurationCompaniesApiServices(
          connectSession,
          companiesDataUri,
          companiesSearchId
        )

        if (serviceResponse) {
          setCompaniesData(serviceResponse)
        }
      }

    if (connectSession) {
      fetchCompaniesDataAgain()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession, companiesDataPage, companiesSearchId])

  // throw if still undefined
  if (companiesData === undefined) {
    return <Loader fullPage={true} label="fetching companies data" />
  }

  // titles items for table headers
  const titles = ['ID', 'Name', 'Branch', 'Action']

  // onChange pagination handler
  const onChangePaginationHandler = (
    type: OnChangePaginationHandlerProps
  ): void => {
    if (companiesData?.totalPageCount !== undefined) {
      switch (type) {
        case 'next':
          if (companiesDataPage < companiesData?.totalPageCount) {
            setCompaniesDataPage((companiesDataPage) => companiesDataPage + 1)
            setCompaniesDataUri(companiesData?._links?.next?.href)
          }
          break
        case 'prev':
          if (companiesDataPage > 1) {
            setCompaniesDataPage((companiesDataPage) => companiesDataPage - 1)
            setCompaniesDataUri(companiesData?._links?.prev?.href)
          }
          break
      }
    }
  }

  // search companies by id
  const searchCompanyByIdFn = (id: SearchCompaniesByIdProps): void => {
    if (id) {
      info(`Searching Company with ID: ${id}`)
      setCompaniesSearchId(id)
    } else {
      info('Please input an ID')
    }
  }

  return (
    <>
      <MainContainer>
        <SecondaryNavContainer>
          <SidebarCompanies searchFn={searchCompanyByIdFn} />
        </SecondaryNavContainer>
        <PageContainer className="el-h-full">
          <Title>Companies</Title>
          <FlexContainer isFlexWrapReverse>
            <Subtitle>
              There are {companiesData.totalCount} Companies that already
              registered
            </Subtitle>
            <PagedPaginationResult
              totalPageCount={companiesData.totalPageCount}
              pageNumber={companiesData.pageNumber}
              pageSize={companiesData.pageSize}
              _links={companiesData._links}
              changeHandler={onChangePaginationHandler}
            />
          </FlexContainer>
          <Table>
            <ListCompaniesHeaders titles={titles} />
            <ListCompaniesData data={companiesData._embedded} />
          </Table>
        </PageContainer>
      </MainContainer>
    </>
  )
}

export default Companies
