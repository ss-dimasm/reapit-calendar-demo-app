import React, { FC, ReactElement } from 'react'
import Loading from '../../utils/Loading'

const ModalFetch: FC = (): ReactElement => {
  return <Loading text="Please Wait..." isCenter />
}

export default ModalFetch
