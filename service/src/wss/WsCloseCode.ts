export enum WsCloseCode {
  Normal = 1000,
  GoingAway = 1001,
  ProtocolError = 1002,
  UnsupportedData = 1003,
  AbnormalClose = 1006,
  InvalidFramePayload = 1007,
  PolicyViolation = 1008,
  MessageTooBig = 1009,
  InternalError = 1011,
}
