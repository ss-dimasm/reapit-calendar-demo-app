import React, { useEffect, FC, useState } from 'react'

import {
  Title,
  Loader,
  Table,
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableCell,
  StatusIndicator,
  Button,
  ModalHeader,
  Modal,
  Subtitle,
} from '@reapit/elements'

import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  configurationPropertiesApiService,
  configurationPropertyDetailApiService,
  configurationPropertyImagesApiService,
} from '../../platform-api/configuration-api'

import {
  PropertyImageModel,
  PropertyModel,
  PropertyModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import PropertyImages from '../ui/properties/propertyImages'

export type PropertiesProps = {}

const Properties: FC<PropertiesProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [propertiesList, setPropertiesList] = useState<
    PropertyModelPagedResult | undefined
  >()
  const [propertyIdDetails, setPropertyIdDetails] = useState<
    string | undefined
  >()
  const [propertyDetails, setPropertyDetails] = useState<
    PropertyModel | undefined
  >()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchPropertiesList = async () => {
      if (!connectSession) return
      const serviceResponse = await configurationPropertiesApiService(
        connectSession
      )
      if (serviceResponse) {
        setPropertiesList(serviceResponse)
      }
    }

    if (connectSession) {
      fetchPropertiesList()
    }
  }, [connectSession])

  //   refetch modal
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!connectSession) return
      const serviceResponse = await configurationPropertyDetailApiService(
        connectSession,
        propertyIdDetails
      )
      if (serviceResponse) {
        setPropertyDetails(serviceResponse)
      }
    }

    if (connectSession && propertyIdDetails !== undefined) {
      fetchPropertyDetails()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession, propertyIdDetails])

  if (propertiesList === undefined) {
    return <Loader label="Fetching Data" fullPage={true} />
  }

  //   define new variable of data
  const properties = propertiesList?._embedded

  //   handle click ev
  type OpenModalProps = string | undefined

  const openModalEv = (id: OpenModalProps) => {
    setPropertyIdDetails(id)
    setIsModalOpen(true)
  }

  return (
    <>
      <Title>Properties All ({propertiesList?.totalCount})</Title>
      <Table>
        <TableHeadersRow>
          <TableHeader>Property Id</TableHeader>
          <TableHeader>Department Id</TableHeader>
          <TableHeader>Rent Price</TableHeader>
          <TableHeader>Frequency Rent</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Action</TableHeader>
        </TableHeadersRow>
        {properties?.map((property) => {
          const { id, departmentId, letting } = property
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{departmentId}</TableCell>
              <TableCell>{letting?.rent}</TableCell>
              <TableCell>{letting?.rentFrequency}</TableCell>
              <TableCell>
                <StatusIndicator intent="low" /> {letting?.status}
              </TableCell>
              <TableCell>
                <Button
                  intent="critical"
                  fullWidth={true}
                  onClick={() => openModalEv(id)}
                >
                  More Info
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </Table>
      {/* load new data from propertyDetails */}
      <Modal
        isOpen={isModalOpen}
        onModalClose={() => {
          setIsModalOpen(false)
          setPropertyIdDetails(undefined)
        }}
        title={'Property ID: ' + propertyDetails?.id}
      >
        <ModalHeader>
          {propertyDetails?.id !== propertyIdDetails ? (
            <LoadingIndicatorModal />
          ) : (
            <LoadedIndicatorModal {...propertyDetails} />
          )}
        </ModalHeader>
      </Modal>
    </>
  )
}

/**
 * Loaded Indicator Modal
 */
const LoadedIndicatorModal: FC<PropertyModel> = (props: PropertyModel) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [propertyImages, setPropertyImages] = useState<
    PropertyImageModel | undefined
  >()

  // fetch image
  useEffect(() => {
    const fetchPropertyImages = async () => {
      if (!connectSession) return
      const serviceResponse = await configurationPropertyImagesApiService(
        connectSession,
        props?._links?.images.href
      )
      if (serviceResponse) {
        setPropertyImages(serviceResponse)
      }
    }
    if (connectSession) {
      fetchPropertyImages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectSession])

  return (
    <>
      <PropertyImages {...propertyImages} />
      <Subtitle hasCenteredText={false}>Property ID: {props.id}</Subtitle>
    </>
  )
}

/**
 * Loading Indicator Modal
 */
const LoadingIndicatorModal: FC<{}> = () => {
  return <Loader fullPage={true} />
}

export default Properties
