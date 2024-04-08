import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import {IoHome} from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { DashboardAlbum, DashboardArtist, DashboardHome, DashboardNewSong, DashboardSongs, DashboardUsers } from '.';
const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
     <Header/>

     <div className='w-[60%] my-2 p-4 flex item-center justify-evenly'>
      <NavLink to={'/dashboard/home'} ><IoHome className=' text-2xl text-textColor'/></NavLink>
      <NavLink to={'/dashboard/user'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
      <NavLink to={'/dashboard/Songs'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
      <NavLink to={'/dashboard/artist'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Artist</NavLink>
      <NavLink to={'/dashboard/albums'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
     </div>
     <div className='my-4 w-full p-4 '>
         <Routes>
          <Route path="/home" element={<DashboardHome/>}/>
          <Route path="/user" element={<DashboardUsers/>}/>
          <Route path="/Songs" element={<DashboardSongs/>}/>
          <Route path="/artist" element={<DashboardArtist/>}/>
          <Route path="/albums" element={<DashboardAlbum/>}/>
          <Route path="/newSong" element={<DashboardNewSong/>}/>
         </Routes>
     </div>
         </div>
  )
}

export default Dashboard 
