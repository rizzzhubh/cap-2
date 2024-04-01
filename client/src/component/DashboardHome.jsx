import React, { useEffect } from 'react'
import {useStateValue} from "../context/StateProvider"
import { getAllUsers } from '../../api'

export const DashboardCard = (icon,name,count) => {
  return (
    <div className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400'>

    <p className='text-xl text-textColor font-semibold'></p>
    <p className='text-xl text-textColor'></p>
 </div>
 
 
  )
}

const DashboradHome = () => {
  const [{allUsers,allSongs,allartist,allAlbum},dispatch] = useStateValue();
  useEffect(() => {
    if(!allUsers){
      getAllUsers().then((data)=>dispatch({type:actionType.SET_ALL_USERS,allUsers:data}))
    }
    
  },[])
  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap '>
      <DashboardCard />
      <DashboardCard/>
      <DashboardCard/>
      <DashboardCard/>

    </div> 
  )
}

export default DashboradHome
