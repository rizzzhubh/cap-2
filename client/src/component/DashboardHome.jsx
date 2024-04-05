import React, { useEffect } from 'react'
import {useStateValue} from "../context/StateProvider"
import { getAllUsers } from '../../api'
import { actionType } from '../context/reducer'

// Update DashboardCard component to accept props
export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400'>
      <p className='text-xl text-textColor font-semibold'>{name}</p>
      <p className='text-xl text-textColor'>Count: {count}</p>
    </div>
  );
}

// Update DashboradHome component to pass props to DashboardCard
const DashboradHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => dispatch({ type: actionType.SET_ALL_USERS, allUsers: data }));
    }
  }, []);

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap '>
      <DashboardCard name="Users" count={allUsers ? allUsers.length : 0} />
      <DashboardCard name="Songs" count={allSongs ? allSongs.length : 0} />
      <DashboardCard name="Artists" count={allArtists ? allArtists.length : 0} />
      <DashboardCard name="Albums" count={allAlbums ? allAlbums.length : 0} />
    </div>
  );
}


export default DashboradHome
