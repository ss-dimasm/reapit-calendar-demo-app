import { NegotiatorModel } from '@reapit/foundations-ts-definitions'

type ResourceNotFoundType = {
  statusCode: number
  dateTime: string
  description: string
}

export type NegotiatorModelType = NegotiatorModel | ResourceNotFoundType
