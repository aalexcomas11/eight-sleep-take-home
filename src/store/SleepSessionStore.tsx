import React, { useState, createContext } from 'react'

import SleepSessionAPI from '../api/SleepSessionAPI'
import {StoreStatus} from './types'
import { SleepSessionsMap } from '../api/types'


export interface SleepSessionContextProps{
  sessions: SleepSessionsMap,
  status: StoreStatus,
  getUserSessions: (userIds: Array<string>) => Promise<SleepSessionsMap>
}

export const SleepSessionContext = createContext<SleepSessionContextProps>({
  sessions: {},
  status: StoreStatus.LOADING,
  getUserSessions: async (userIds: Array<string>) => { return {} }
})

export interface SleepSessionStoreProps{
  children: React.ReactChild
}

const SleepSessionStore = ({
  children
}: SleepSessionStoreProps) => {
  const [sessions, setSessions] = useState<SleepSessionsMap>({})
  const [status, setStatus] = useState<StoreStatus>(StoreStatus.LOADING)

  
  
  const getUserSessions = async (sessionID: Array<string>): Promise<SleepSessionsMap> => {
    
    const resp = await Promise.all(sessionID.map(_getUserSession))
    
    /*
      filter out errors for the purpose
      of the demo and return empty array
    */
    const sessions = resp
      .filter((session) => {
      return !session.error
      }).reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})
    
    setSessions(sessions)
    setStatus(StoreStatus.READY)
    return sessions
  }

  const _getUserSession = (id: string) => {
    return SleepSessionAPI.getSleepSession(id)
      .then((resp) => {
        const data = SleepSessionAPI._data(resp)
        data.id = id
        return data
      })
      .catch((err) => {
        const message = err.message || 'something went wrong'
        return { error:  message}
      })
  }

  return (
    <SleepSessionContext.Provider value={{
      status,
      sessions,
      getUserSessions
    }}>
      {children}
    </SleepSessionContext.Provider>
  )
}


export default SleepSessionStore