import React, { FC, ReactElement } from 'react'
import { Loader } from '@reapit/elements'

type LoadingType = {
  text: string
  isCenter?: boolean
  isFullScreen?: boolean
}

const Loading: FC<LoadingType> = (props): ReactElement => {
  return (
    <div className={`el-flex ${props.isCenter && 'el-flex-justify-center'}`}>
      <Loader label={props.text} fullPage={props.isFullScreen} />
    </div>
  )
}

Loading.defaultProps = {
  isFullScreen: false,
}

export default Loading
