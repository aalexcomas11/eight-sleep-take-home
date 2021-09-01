import React, { useState, createContext, useEffect } from 'react'

import SleepSessionAPI from '../api/SleepSessionAPI'
import { SleepSessionsMap } from '../api/types'


export interface SleepSessionContextProps{
  sessions: any,
  getUserSessions: (userIds: Array<string>) => Promise<SleepSessionsMap>
}

export const SleepSessionContext = createContext<SleepSessionContextProps>({
  sessions: {},
  getUserSessions: async (userIds: Array<string>) => { return {} }
})

export interface SleepSessionStoreProps{
  children: React.ReactChild
}

const SleepSessionStore = ({
  children
}: SleepSessionStoreProps) => {
  const [sessions, setSessions] = useState<SleepSessionsMap>({})

  
  
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
      sessions,
      getUserSessions
    }}>
      {children}
    </SleepSessionContext.Provider>
  )
}


export default SleepSessionStore