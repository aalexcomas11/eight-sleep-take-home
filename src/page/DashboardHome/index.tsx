import React, { useContext, useEffect } from 'react'
import { RouteComponentProps} from 'react-router-dom'

import {StoreStatus} from '../../store/types'
import {
  SleepSessionContext
} from '../../store/SleepSessionStore'

export interface DashboardHomeProps extends RouteComponentProps{

}
const DashboardHome = (props: RouteComponentProps) => {
  const store = useContext(SleepSessionContext)

  useEffect(() => {
    store.getUserSessions([
      '2228b530e055401f81ba37b51ff6f81d',
      'f9bf229fd19e4c799e8c19a962d73449',
      'd6c1355e38194139b8d0c870baf86365'
    ])
  }, [])


  if (StoreStatus.LOADING) {
    return (
      <div>
        ...loading
      </div>
    )
  }

  if (StoreStatus.READY) {
    return (
      <div>
        Ready bro
      </div>
    )
  }

  return (
    <div>
      Nothing to see here
    </div>
  )
}


export default DashboardHome