import React from 'react';
import { TableHeader, TableHeadersRow } from '@reapit/elements';

type ListCompaniesHeadersProps = {
  titles: string[];
};

const ListCompaniesHeaders = ({ titles }: ListCompaniesHeadersProps) => {
  return (
    <>
      <TableHeadersRow>
        {titles.map((title, index) => {
          return <TableHeader key={index}>{title}</TableHeader>;
        })}
      </TableHeadersRow>
    </>
  );
};

export default ListCompaniesHeaders;
