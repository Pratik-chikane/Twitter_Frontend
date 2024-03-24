import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { store } from '../../Store/Store';


const ProfileCard = () => {
  const { auth } = useSelector(store=>store);
    const navigate = useNavigate();
  return (
    <div>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => navigate(`/profile/${6}`)}>
        <div className="flex items-center space-x-3">
          <Avatar 
            alt="USERNAME"
            src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
          />

          <div className="flex flex-col">
            <span>{auth.user?.fullName}</span>
            <span className="opacity-50">@{auth.user?.fullName?.toLowerCase()}</span>
          </div>

         
        </div>
      </div>
    </div>
  )
}

export default ProfileCard