import React, { useState, createContext } from 'react'

import SleepSessionAPI from '../api/SleepSessionAPI'
import {StoreStatus} from './types'
import { SleepSessions, SleepSessionsMap } from '../api/types'


export interface SleepSessionContextProps{
  sessions: SleepSessionsMap,
  status: StoreStatus,
  getUserSessions: (userIds: Array<string>) => Promise<SleepSessionsMap>
  getUserSession: (id: string) => Promise<SleepSessions | {}>
}

export const SleepSessionContext = createContext<SleepSessionContextProps>({
  sessions: {},
  status: StoreStatus.LOADING,
  getUserSessions: async (userIds: Array<string>) => { return {} },
  getUserSession: async (id: string) => { return {} }
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
      .reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})
    
    setSessions(sessions)
    setStatus(StoreStatus.READY)
    return sessions
  }

  const getUserSession = async (id: string): Promise<SleepSessionsMap> => {
    setStatus(StoreStatus.LOADING)
    const session = await _getUserSession(id)
    return new Promise((resolve) => {
      setSessions((sessions) => {
        const sesh = { ...sessions }
        sesh[id] = session
        setStatus(StoreStatus.READY)
        resolve(sesh)
        return sesh
      })
    })
    
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
      getUserSession,
      getUserSessions
    }}>
      {children}
    </SleepSessionContext.Provider>
  )
}


export default SleepSessionStore