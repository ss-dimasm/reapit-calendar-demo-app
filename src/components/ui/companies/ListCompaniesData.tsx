import React from 'react';
import { CompanyModelPagedResult } from '@reapit/foundations-ts-definitions';
import { TableCell, TableRow, Button } from '@reapit/elements';

// indexed access CompanyModelPagesResult Interface
type EmbeddedCompanyModelPagedResult = {
  data: CompanyModelPagedResult['_embedded'];
};

const ListCompaniesData = ({ data }: EmbeddedCompanyModelPagedResult) => {
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
              <Button fullWidth={true} intent='primary'>
                More Information
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default ListCompaniesData;
