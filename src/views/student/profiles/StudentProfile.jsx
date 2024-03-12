
import { useState } from 'react'
import UserProfile from '../../../components/profile/Profile'

export default function Profile(){
 const [createLink, setCreateLink] = useState('/profile-edit')


    return (
       <UserProfile  editProfile={createLink}/>
      )
    }