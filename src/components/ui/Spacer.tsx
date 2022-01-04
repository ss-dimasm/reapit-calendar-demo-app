import React from 'react'

type SpacerType = {
  number: number
}

const Spacer = ({ number }: SpacerType) => {
  return <div style={{ height: number }}></div>
}

export default Spacer
