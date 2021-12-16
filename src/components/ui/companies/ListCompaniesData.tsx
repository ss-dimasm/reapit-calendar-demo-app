import React, { FC, ReactElement } from 'react';
import { CompanyModelPagedResult } from '@reapit/foundations-ts-definitions';
import { TableCell, TableRow, Button } from '@reapit/elements';

// indexing _embedded from CompanyModelPagesResult Interface
type EmbeddedCompanyModelPagedResult = {
  data: CompanyModelPagedResult['_embedded'];
};

const ListCompaniesData: FC<EmbeddedCompanyModelPagedResult> = (
  props: EmbeddedCompanyModelPagedResult
): ReactElement => {
  const { data } = props;
  return (
    <>
      {data?.map((company) => {
        const { id, name, branch } = company;
        return (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{branch}</TableCell>
            <TableCell>
              <Button intent='primary'>More Information</Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default ListCompaniesData;
