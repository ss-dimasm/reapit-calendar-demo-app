import React from 'react';

import { CompanyModelPagedResult } from '@reapit/foundations-ts-definitions';
import { Icon, PaginationButton, PaginationText, PaginationWrap } from '@reapit/elements';

type PaginationLinksProps = CompanyModelPagedResult['_links'];

type PaginationProps = {
  totalPageCount: number | undefined;
  pageNumber: number | undefined;
  pageSize: number | undefined;
  _links: PaginationLinksProps | undefined;
  changeHandler: (ev) => void | any;
};

const PagedPaginationResult = ({ totalPageCount, pageNumber, pageSize, _links, changeHandler }: PaginationProps) => {
  return (
    <>
      <PaginationWrap className='el-mt-3'>
        <PaginationText>
          <strong>{pageNumber}</strong> of {totalPageCount}
        </PaginationText>
        <PaginationButton onClick={() => changeHandler('prev')}>
          <Icon icon='backSystem' />
        </PaginationButton>
        <PaginationButton onClick={() => changeHandler('next')}>
          <Icon icon='nextSystem' />
        </PaginationButton>
      </PaginationWrap>
    </>
  );
};

export default PagedPaginationResult;
