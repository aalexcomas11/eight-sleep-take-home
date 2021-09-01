import React, { useState, createContext } from 'react'

import SleepSessionAPI from '../api/SleepSessionAPI'


export interface SleepSessionContextProps{
  sessions: Array<any>,
  getUserSessions: (userIds: Array<string>) => Promise<any>
}

export const SleepSessionContext = createContext<SleepSessionContextProps>({
  sessions: [],
  getUserSessions: async (userIds: Array<string>) => []
})

export interface SleepSessionStoreProps{
  children: React.ReactChild
}

const SleepSessionStore = ({
  children
}: SleepSessionStoreProps) => {
  const [sessions, setSessions] = useState<any>([])
  
  const getUserSessions = async (sessionID: Array<string>) => {
    
    const resp = await Promise.all(sessionID.map(_getUserSession))
    
    /*
      filter out errors for the purpose
      of the demo and return empty array
    */
    const sessions = resp
      .filter((session) => {
      return !session.error
      })
    
    setSessions(sessions)
  }

  const _getUserSession = (id: string) => {
    return SleepSessionAPI.getSleepSession(id)
      .then(SleepSessionAPI._data)
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