import React, { FC, ReactElement } from 'react'

import { CardHeading, CardSubHeading, CardWrap } from '@reapit/elements'

export const NotFound: FC = (): ReactElement => {
  return (
    <CardWrap className="el-mt6 el-w9 el-mx-auto">
      <CardHeading>Unfortunately</CardHeading>
      <CardSubHeading>
        We could`&apos;nt find Property that match with the address
      </CardSubHeading>
    </CardWrap>
  )
}
