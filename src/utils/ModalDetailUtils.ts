import { PropertyImageDataType } from '../interfaces/appointmentInterfaces';

type PhotoType = {
	imageSource: string | undefined;
	imageAlt: string | undefined;
};

const ALT_IMAGE_SOURCE = 'https://i.stack.imgur.com/6M513.png';

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
		photoSource.imageSource = ALT_IMAGE_SOURCE;
		photoSource.imageAlt = 'not-found';
	} else {
		photoSource.imageSource = propertyImageData?._embedded?.[0]?.url;
		photoSource.imageAlt = propertyImageData?._embedded?.[0]?.caption;
	}

	return photoSource;
};
