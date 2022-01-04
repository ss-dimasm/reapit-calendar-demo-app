import React, { FC } from 'react'

import { Title, Loader } from '@reapit/elements'
import { PropertyImageModel } from '@reapit/foundations-ts-definitions'

const PropertyImages: FC<PropertyImageModel> = (props: PropertyImageModel) => {
  if (props === undefined) {
    return <Loader label="fetching images" />
  }

  const { _embedded } = props

  if (_embedded && _embedded?.length !== 0) {
    return (
      <>
        {_embedded.map((image: PropertyImageModel) => {
          return (
            <React.Fragment key={image.id}>
              <img src={image.url} alt={image.caption} />
            </React.Fragment>
          )
        })}
      </>
    )
  }

  return (
    <>
      <Title>No images is available</Title>
    </>
  )
}

export default PropertyImages
