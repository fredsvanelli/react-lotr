import { CharacterType } from './CharacterType'

export type QuoteType = {
  _id: string
  dialog: string
  character: string
  charactterObject?: CharacterType
}

export type MovieType = {
  _id: string
  name: string
  runtimeInMinutes?: number
  budgetInMillions?: number
  boxOfficeRevenueInMillions?: number
  academyAwardNominations?: number
  academyAwardWins?: number
  rottenTomatoesScore?: number
}
