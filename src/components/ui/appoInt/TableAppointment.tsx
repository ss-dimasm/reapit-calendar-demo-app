import React, { FC, ReactElement } from 'react'

import { Table } from '@reapit/elements'

import { TableAppointmentProps } from '../../../interfaces/appointmentInterfaces'

import SubTableAppointment from './SubTableAppointment'

const TableAppointment: FC<TableAppointmentProps> = (props): ReactElement => {
  const { propertyData } = props

  const propertiesDetailDatas: any[] = []

  if (propertyData?._embedded !== undefined) {
    propertyData._embedded.forEach((property): void => {
      const data = {
        cells: [
          {
            label: 'Type',
            value: property.type,
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Address',
            value: property.address?.buildingName,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Bed Rooms',
            value: property.bedrooms,
          },
          {
            label: 'Bath Rooms',
            value: property.bathrooms,
          },
          {
            label: 'Currency',
            value: property.currency,
          },
          {
            label: 'Price',
            value: property.selling?.price,
            cellHasDarkText: true,
          },
        ],
        expandableContent: {
          content: (
            <SubTableAppointment
              propertyId={property.id}
              negoId={property.negotiatorId}
              description={property.description}
            />
          ),
        },
      }

      propertiesDetailDatas.push(data)
    })
  }

  return (
    <Table
      className="el-mt6 el-w9 el-flex el-flex-column el-flex-wrap el-flex-justify-center el-mx-auto"
      rows={propertiesDetailDatas}
    />
  )
}

export default TableAppointment
