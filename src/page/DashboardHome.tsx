import React, { useContext, useEffect } from 'react'

import {
  SleepSessionContext,
  SleepSessionContextProps
} from '../store/SleepSessionStore'


const DashboardHome= () => {
  const store = useContext(SleepSessionContext)

  useEffect(() => {
    store.getUserSessions(['2228b530e055401f81ba37b51ff6f81d'])
  }, [])
  

  const sesh = () => {
    if(!store.sessions.length){
      return [{data: 'hello'}]
    }

    return store.sessions[0]
  }

  return (
    <div>
      sessions: {JSON.stringify(sesh())}
    </div>
  )
}


export default DashboardHome