import React, { FC, ReactElement } from 'react';
import { TableHeader, TableHeadersRow } from '@reapit/elements';

type ListCompaniesHeadersProps = {
  titles: string[];
};

const ListCompaniesHeaders: FC<ListCompaniesHeadersProps> = (props: ListCompaniesHeadersProps): ReactElement => {
  const { titles } = props;
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
