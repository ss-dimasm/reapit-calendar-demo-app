import { PropertyImageDataType } from '../components/ui/appoInt/SubTableAppointment';

type PhotoType = {
  imageSource: string | undefined;
  imageAlt: string | undefined;
};

const altImageSource = 'https://i.stack.imgur.com/6M513.png';

/**
 * Recovery Image Source and Image Alt when Property Images Data is Empty
 * @param propertyImageData
 * @returns
 */

export const RecoverImagePropertyIfEmpty = (propertyImageData: PropertyImageDataType) => {
  const photoSource: PhotoType = {
    imageSource: '',
    imageAlt: '',
  };

  if (propertyImageData?.totalCount === 0) {
    photoSource.imageSource = altImageSource;
    photoSource.imageAlt = 'not-found';
  } else {
    photoSource.imageSource = propertyImageData?._embedded?.[0]?.url;
    photoSource.imageAlt = propertyImageData?._embedded?.[0]?.caption;
  }

  return photoSource;
};
