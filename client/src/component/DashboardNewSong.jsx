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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [songImageCover, setSongImageCover] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [ImageLoadProgress, setImageLoadProgress] = useState(null);
  const [{ artists, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
      if (!artists) {
          getAllArtist()
          .then((data) => {
              console.log("All Artist",data.artist);
              dispatch({
                  type: actionType.SET_ARTISTS,
                  artists: data.artist,
                });
                console.log("artistss =", artists, "albums ==", allAlbums);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching artists:", error);
        });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300">
      <input
        type="text"
        placeholder="Type Your Song Name...."
        className="w-full p-3 
     rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />

      <div className="flex w-full justify-between py-5 flex-wrap items-center gap-5  ">
        <FilterButtons filterData={artists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>

      <div className="bg-card w-full h-[300px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer ">
        <div className="w-full h-full flex items-center justify-center">
        {isImageLoading && <FileLoader progress={ImageLoadProgress}/>}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
                <FileUpLoader updateState={setSongImageCover} setProgress ={
                    setImageLoadProgress
                }  isLoading = {setIsImageLoading} isImage = {true}/>
            ): (<div>

            </div>)}
          </>
        )}
         
        </div>

      </div>
    </div>
  );
};



export const FileLoader = ({progress}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-textColor">
            {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}

            </p>
            <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>

            </div>
        </div>
    )
    
}


export const FileUpLoader = ({ updateState, setProgress, isLoading, isImage }) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const StorageRef = ref(storage, `${isImage ? "images" : "songs"}/${Date.now()}-${uploadedFile.name}`);
    const uploadTask = uploadBytesResumable(StorageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            updateState(downloadURL);
            isLoading(false);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };
    return (
     
        <label>
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center cursor-pointer">
            <p className="text-2xl text-gray-400">
            <BiCloudUpload />
          </p>
          <p className="text-lg">Click To UpLoad {isImage ? "an image" : "an audio"}</p>
            </div>
            </div>
            <input type="file" name="upload-file" accept={`${isImage ? "image/*" : "audio/*"}`}
            className="w-0 h-0" onChange={uploadFile}/>
        </label>

        )
        }

export default DashboardNewSong;
