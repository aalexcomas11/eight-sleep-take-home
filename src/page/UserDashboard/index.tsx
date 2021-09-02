import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Chart from "react-apexcharts";

import { SleepSessionContext } from '../../store/SleepSessionStore'
import { StoreStatus } from '../../store/types'


export interface UserDashboardProps extends RouteComponentProps {

}

var options = {
};

const series = [
  {
    data: [
      {
        x: 'Analysis',
        y: [
            new Date('2019-02-27').getTime(),
  new Date('2019-03-04').getTime()
          ],
fillColor: '#008FFB'
        },
{
  x: 'Design',
    y: [
      new Date('2019-03-04').getTime(),
      new Date('2019-03-08').getTime()
    ],
      fillColor: '#00E396'
},
{
  x: 'Coding',
    y: [
      new Date('2019-03-07').getTime(),
      new Date('2019-03-10').getTime()
    ],
      fillColor: '#775DD0'
},
{
  x: 'Testing',
    y: [
      new Date('2019-03-08').getTime(),
      new Date('2019-03-12').getTime()
    ],
      fillColor: '#FEB019'
},
{
  x: 'Deployment',
    y: [
      new Date('2019-03-12').getTime(),
      new Date('2019-03-17').getTime()
    ],
      fillColor: '#FF4560'
}
      ]
    }
  ],






const UserDashboard = ({
  match
}: UserDashboardProps) => {
  const store = useContext(SleepSessionContext)

  console.log(store)

  useEffect(() => {
    const { userID } = match.params as { userID: string }
    if (userID) {
      store.getUserSession(userID)
    }
  },[])

  if (store.status === StoreStatus.LOADING) {
    return <div>...loading</div>
  }

  if (store.status === StoreStatus.READY) {
    return <div>
      <Chart
        series={series}
        options={options}
        type="rangeBar"
      />
    </div>
  }

  return (
    <div>Nothing to see here</div>
  )
}

export default UserDashboard