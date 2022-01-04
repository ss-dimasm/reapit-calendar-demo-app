import React, { FC, ReactElement } from 'react'
import {
  StaffModel,
  StaffModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import {
  CardHeading,
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextWrap,
  CardWrap,
  Icon,
  Loader,
} from '@reapit/elements'

type StaffModelPagedResultType = {
  data: StaffModelPagedResult | undefined
}
type StaffModelSingleType = {
  data: StaffModel | undefined
}
const StaffCompanies: FC<StaffModelPagedResultType> = (
  props: StaffModelPagedResultType
): ReactElement => {
  const { data } = props

  if (data === undefined) {
    return (
      <>
        <Loader label="fetching data staff" />
      </>
    )
  }

  return (
    <div className="el-mt6">
      <CardWrap>
        {data._embedded === undefined ? (
          <CardHeading>No Staff that already Registered</CardHeading>
        ) : (
          <>
            <CardHeading>Staff List</CardHeading>
            {data._embedded.map((employee: StaffModel) => {
              return <EmployeeChild data={employee} key={employee.name} />
            })}
          </>
        )}
      </CardWrap>
    </div>
  )
}

const EmployeeChild: FC<StaffModelSingleType> = (
  props: StaffModelSingleType
): ReactElement => {
  const { data } = props

  return (
    <CardListItem>
      <CardListIcon>
        <Icon icon="usernameSystem" />
      </CardListIcon>
      <CardListItemTextWrap>
        <CardListItemTextPrimary>{data?.name}</CardListItemTextPrimary>
        <CardListItemTextPrimary>{data?.email}</CardListItemTextPrimary>
      </CardListItemTextWrap>
    </CardListItem>
  )
}
export default StaffCompanies
