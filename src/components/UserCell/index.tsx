import React from 'react'

export interface UserCellProps{
  initials: string
}

const UserCell = ({initials}: UserCellProps) => {
  return (
    <div className={`
      flex
      bg-indigo-800
      rounded-md
      h-48
      w-48
      p-6
      mx-2
    `}>
      <div className={`
        m-auto
        text-2xl
        tracking-wide
      `}>
        {initials}
      </div>
    </div>
  )
}

export default UserCell