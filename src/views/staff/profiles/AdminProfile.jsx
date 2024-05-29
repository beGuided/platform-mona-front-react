import { useState } from 'react'
import UserProfile from '../../../components/profile/Profile'

export default function Profile(){
 // const {user,}  = useStateContext();
 const [createLink, setCreateLink] = useState('/create-profile')

    return (
       <UserProfile  editProfile={createLink}/>
      )
    }