export enum CardStatusCodes {
  ValidCard = "0",
  ForcedPinChange = "14",
  TemporaryBlockedByClient = "20",
  LostCard = "6",
  StolenCard = "7",
  InvalidCard = "9",
  CardIsNotActivated = "12",
}
export enum CardAvailableStatusCodes {
  ReportLostOrStolen = "ReportLostOrStolen",
  SetPin = "SetPin",
}
