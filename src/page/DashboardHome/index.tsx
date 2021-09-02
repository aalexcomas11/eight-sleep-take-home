import React, { useContext, useEffect } from 'react'
import { RouteComponentProps, Link} from 'react-router-dom'

import UserCell from '../../components/UserCell'
import {StoreStatus} from '../../store/types'
import {
  SleepSessionContext
} from '../../store/SleepSessionStore'

export interface DashboardHomeProps extends RouteComponentProps{

}
const   DashboardHome = (props: RouteComponentProps) => {
  const store = useContext(SleepSessionContext)

  useEffect(() => {
    store.getUserSessions([
      '2228b530e055401f81ba37b51ff6f81d',
      'f9bf229fd19e4c799e8c19a962d73449',
      'd6c1355e38194139b8d0c870baf86365'
    ])
  }, [])

  if (store.status === StoreStatus.LOADING) {
    return (
      <div>
        ...loading
      </div>
    )
  }

  if (store.status === StoreStatus.READY) {
    return (
      <div className={`
        p-8
        flex
        justify-center
        items-start
        mx-auto
      `}>
        {
          Object.keys(store.sessions)
            .map((userID) => {
              return (
                <Link to={`/sleepSession/user/${userID}`}>
                  <UserCell initials={'AC'} />
                </Link>
              )
            })
        }
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