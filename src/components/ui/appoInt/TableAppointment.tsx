import React, { FC, ReactElement } from 'react';

import { Table } from '@reapit/elements';

import { PropertyModelPagedResultVamp, SearchParamsType } from '../../pages/calendar';

type TableAppointmentProps = {
  propertyData?: PropertyModelPagedResultVamp; // soon will be data that matched
  searchParams?: SearchParamsType;
};

const TableAppointment: FC<TableAppointmentProps> = (props: TableAppointmentProps): ReactElement => {
  const { propertyData } = props;

  const propertiesDetailDatas = new Array();

  if (propertyData?._embedded !== undefined) {
    propertyData?._embedded.map((property): void => {
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
          content: <p>I am the content that is only visible when expanded</p>,
        },
      };

      propertiesDetailDatas.push(data);
    });
  }

  console.log(propertyData);

  return (
    <Table
      className='el-mt6 el-w9 el-flex el-flex-column el-flex-wrap el-flex-justify-center el-mx-auto'
      rows={propertiesDetailDatas}
    />
  );
};

export default TableAppointment;
