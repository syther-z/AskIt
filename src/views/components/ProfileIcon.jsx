import React from 'react'
import { getRandomColor } from '../../controllers/helper'

const ProfileIcon = ({name, size = 10}) => {
  return (
   name != undefined ? <div className={`flex justify-center items-center ${getRandomColor()}`}
   
   style={{
    display: 'inline-flex',
    minWidth: size +'px',
    minHeight: size +'px',
    borderRadius: '50%',
   }}>{name.substring(0, 2).toUpperCase()}</div> : <img src="user.png" width={size} alt="profile" />
    
   
)
}

export default ProfileIcon

 {/* name != undefined ? <div
    
    style={
        {
            width: size+'px',
            height: size+'px'
        }
    }
    
    className={`rounded-full ${getRandomColor()} flex justify-center items-center`}>{name.substring(0, 2).toUpperCase()}</div>
    : <img src="user.png" width={size} alt="profile" /> */}