import {
	AppointmentModelPagedResult,
	NegotiatorModel,
	PropertyImageModelPagedResult,
	PropertyModel,
	PropertyModelPagedResult,
	CreateAppointmentModel,
} from '@reapit/foundations-ts-definitions';

// Calendar Page
export type PropertyModelPagedResultVamp = PropertyModelPagedResult | undefined;

// SearchBar Component
export type SearchBarProps = {
	searchNewParams: (params) => void;
	resetPropertiesData: () => void;
};

// Table Appointment Component
export interface TableAppointmentProps {
	propertyData: PropertyModelPagedResult | undefined;
	searchParams: string;
}
//  SubTableAppointment Component
export interface SubTableAppointmentProps {
	propertyId: PropertyModel['id'];
	negoId: PropertyModel['negotiatorId'];
	description: PropertyModel['description'];
}
export type AppointmentModelPagedResultVamp = AppointmentModelPagedResult | undefined;
export type ChangeCurrentStepType = 'forward' | 'backward';
export type ModalStatsType = 'details' | 'identity' | 'reserving' | 'summary' | 'receipt';
export type PropertyDataType = PropertyModel | undefined;
export type UserInfoTypeProps = UserInfoType | undefined;

export type AppointmentDateType = {
	id: string | number | undefined;
	title: string | undefined;
	start: any;
	end: any;
	resource: {
		type: string;
	};
};
export type AppointmentDateProps = AppointmentDateType | undefined;
export type NegotiatorDataType = NegotiatorModel | undefined;
export type PropertyImageDataType = PropertyImageModelPagedResult | undefined;
export type UserInfoType = {
	name: string | undefined;
	email: string | undefined;
	phone: string | undefined;
	purpose: string | undefined;
};
// Modal Appointment Component
export type ModalAppointmentDataProps = {
	modalStats: ModalStatsType;
	propertyData: PropertyDataType;
	propertyImageData: PropertyImageDataType;
	negotiatorData: NegotiatorModel | undefined;
	events: AppointmentModelPagedResult['_embedded'] | undefined;
	userInfo: UserInfoTypeProps;
	appointmentDateData: AppointmentDateProps;
	finalReservedAppointment: CreateAppointmentModelType | undefined;
	changeStep: (status: ChangeCurrentStepType) => void;
	changeUserInfo: (data: UserInfoType) => void;
	userPurpose: (data: string | undefined) => void;
	changeAppointmentDate: (data: AppointmentDateProps) => void;
	setFinalReservedAppointment: (data: CreateAppointmentModelType) => void;
	closeModalProperty: () => void;
};

// Modal Items: Calendar Component
export type ModalCalendarType = {
	events: AppointmentModelPagedResult['_embedded'] | undefined;
	userInfo: UserInfoTypeProps;
	changeStep: (status: ChangeCurrentStepType) => void;
	userPurpose: (data: string | undefined) => void;
	changeAppointmentDate: (data: AppointmentDateProps) => void;
};

// Modal Items: Detail Component
export type ModalDetailType = {
	propertyData: PropertyDataType;
	propertyImageData: PropertyImageDataType;
	negotiatorData: NegotiatorDataType | undefined;
	changeStep: (status: ChangeCurrentStepType) => void;
};

// Modal items: Identity Component
export type ModalIdentityType = {
	changeStep: (status: ChangeCurrentStepType) => void;
	changeUserInfo: (data: UserInfoType) => void;
};
export type ChangeDataType = 'name' | 'mail' | 'phone' | 'purpose';

// Modal items: Summary Component
export type ModalSummaryType = {
	propertyData: PropertyDataType;
	propertyImagesData: PropertyImageDataType;
	userInfoData: UserInfoTypeProps;
	appointmentDateData: AppointmentDateProps;
	negotiatorData: NegotiatorDataType;
	finalReservedAppointment: CreateAppointmentModelType | undefined;
	changeStep: (status: ChangeCurrentStepType) => void;
	setFinalReservedAppointment: (data: CreateAppointmentModelType) => void;
};

/**
 * @param CreateAppointmentModel
 */
export type CreateAppointmentModelType = CreateAppointmentModel;

// Modal items: Receipt Component
export type ModalReceiptType = {
	userInfoData: UserInfoTypeProps;
	negotiatorData: NegotiatorDataType;
	finalReservedAppointment: CreateAppointmentModelType | undefined;
	changeStep: (status: ChangeCurrentStepType) => void;
	closeModalProperty: () => void;
};
