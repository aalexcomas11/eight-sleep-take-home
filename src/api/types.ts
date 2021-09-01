export type SleepSessionsMap = {
  [K: string]: SleepSessions
}

export type SleepSessions = {
  id: string,
  intervals: SleepInterval
}

export type SleepInterval = {
  id: string
  ts: string,
  stages: Array<SleepStage>
  score: number,
  timeseries: Array<TimeSeries>
}

export type SleepStage = {
  stage: string,
  duration: number
}

export type TimeSeries = {
  tnt: Array<number | string>
  respitoryRate: Array<number | string>
  tempRoomC: Array<number | string>
  tempRoomB: Array<number | string>
  heartRate: Array<number | string>
}