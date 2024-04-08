import React, { useEffect, useRef, useState } from "react";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
// import FilterButtons from "./FilterButtons";
import { getAllAlbums, getAllArtist } from "../../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/Supportfunctions";
import { IoMusicalNote } from "react-icons/io5";
import FilterButtons from "./FilterButtons";


const DashboardNewSong = () => {
    const [songName, setSongName] = useState("");
 const [{artists,allAlbums},dispatch] = useStateValue();
 console.log("artistss =",artists,"albums ==",allAlbums);

 useEffect(() => {
    if (!artists) {
        getAllArtist()
            .then((data) => {
                dispatch({
                    type: actionType.SET_ARTISTS,
                    artists: data.artist, 
                });
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching artists:", error);
            });
        }

     if(!allAlbums){
         getAllAlbums().then((data) => {
             dispatch({
                 type: actionType.SET_ALL_ALBUMS,
                 allAlbums: data.album
             })
         })
     }
 },[])
  return (
    <div className='flex flex-col items-center justify-center p-4 border border-gray-300'>
     <input type="text" placeholder="Type Your Song Name...." className="w-full p-3 
     rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent" value={songName} onChange={(e) => setSongName(e.target.value)} />

     <div className="flex w-full justify-between py-5 flex-wrap items-center gap-4 ">
        <FilterButtons filterData = {artists} flag = {"Artist"}/>
        <FilterButtons filterData = {allAlbums} flag = {"Albums"}/>
        <FilterButtons filterData = {filterByLanguage} flag = {"Language"}/>
        <FilterButtons filterData = {filters} flag = {"Category"}/>
     </div>
         </div>

)}

export default DashboardNewSong
