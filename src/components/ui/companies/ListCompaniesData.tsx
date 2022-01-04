import React, { FC, ReactElement, useState, useEffect } from 'react'

import {
  CompanyModelPagedResult,
  CompanyModel,
  StaffModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { TableCell, TableRow, Button, Modal } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'

import {
  configurationCompaniesApiServices,
  configurationCompaniesEmployeeApiServices,
} from '../../../platform-api/configuration-api'

import { reapitConnectBrowserSession } from '../../../core/connect-session'

import { CompaniesModelPagedVamp } from '../../pages/companies'
import ModalSingleCompanyData from './ModalSingleCompanyData'
import StaffCompanies from './StaffCompanies'

// indexing _embedded from CompanyModelPagesResult Interface
export type EmbeddedCompanyModelPagedResult = {
  data: CompanyModelPagedResult['_embedded']
}
export type CompanyIdDataType = CompanyModel | undefined

type ModalOpenType = boolean
type CompanyIdType = string | undefined
type CompanyIdStaffType = StaffModelPagedResult | undefined

const ListCompaniesData: FC<EmbeddedCompanyModelPagedResult> = (
  props: EmbeddedCompanyModelPagedResult
): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data } = props

  const [modalOpen, setModalOpen] = useState<ModalOpenType>(false)
  const [companyId, setCompanyId] = useState<CompanyIdType>(undefined)
  const [companyIdData, setCompanyIdData] =
    useState<CompanyIdDataType>(undefined)
  const [companyIdDataStaff, setCompanyIdDataStaff] =
    useState<CompanyIdStaffType>(undefined)

  const companyModalDetails = (id: CompanyIdType): void => {
    setModalOpen(true)
    setCompanyId(id)
  }

  useEffect(() => {
    if (!companyId) return

    const fetchSingleCompanyData =
      async (): Promise<CompaniesModelPagedVamp> => {
        if (!connectSession) return
        const serviceResponse = await configurationCompaniesApiServices(
          connectSession,
          undefined,
          companyId
        )

        if (serviceResponse) {
          setCompanyIdData(serviceResponse)
        }
      }

    const fetchSingleCompanyEmployeeData =
      async (): Promise<CompanyIdStaffType> => {
        if (!connectSession) return
        const serviceResponse = await configurationCompaniesEmployeeApiServices(
          connectSession,
          companyId
        )

        if (serviceResponse) {
          setCompanyIdDataStaff(serviceResponse)
        }
      }

    if (connectSession) {
      fetchSingleCompanyData()
      fetchSingleCompanyEmployeeData()
    }
  }, [connectSession, companyId])

  // close Modal (clear all)
  const closeModalEv = (): void => {
    setModalOpen(false)
    setCompanyId(undefined)
    setCompanyIdData(undefined)
    setCompanyIdDataStaff(undefined)
  }
  return (
    <>
      {data?.map((company) => {
        const { id, name, branch } = company
        return (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{branch}</TableCell>
            <TableCell>
              <Button intent="primary" onClick={() => companyModalDetails(id)}>
                More Information
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
      <Modal
        isOpen={modalOpen}
        onModalClose={closeModalEv}
        title={`Company ID: ${companyId}`}
      >
        <ModalSingleCompanyData data={companyIdData} />
        <StaffCompanies data={companyIdDataStaff} />
      </Modal>
    </>
  )
}

export default ListCompaniesData
