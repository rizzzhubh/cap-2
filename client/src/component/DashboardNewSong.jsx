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
import { SaveNewArtist, getAllAlbums, getAllArtist,getAllSongs,saveNewSong } from "../../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/Supportfunctions";
import { IoMusicalNote } from "react-icons/io5";
import FilterButtons from "./FilterButtons";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const DashboardNewSong = () => {
  
  const [songName, setSongName] = useState("");
  const [songImageCover, setSongImageCover] = useState(null);
  const [ImageLoadProgress, setImageLoadProgress] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading,setIsAudioLoading] = useState
  (false)

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false); 
  const [artistName,setArtistName] = useState("")
  const [twitter,settwitter] = useState("")
  const [Instagram,setInstagram] = useState("")
  
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false); 
  const [albumName,setAlbumName] = useState("")
  
 
  const [{ artists, allAlbums,allSongs,artistFilter,albumFilter,filterTerm,languageFilter }, dispatch] = useStateValue();
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

  const deleteFile = (url,isImage) => {
    if (isImage){
    setImageLoadProgress(true)
    setIsAudioLoading(true)
}
const deleteRef = ref(storage, url);
deleteObject(deleteRef).then(() => {
    setSongImageCover(null)
    setAudioImageCover(null)
    setIsImageLoading(false)
    setAudioUploadProgress(false)
})

}

const saveSong = () => {
   if(!songImageCover||!audioImageCover) {
    alert("Please Upload Image and Audio")
   }
   else{
    setIsImageLoading(true)
    setIsAudioLoading(true)
    const data = {
        name: songName,
        imageURL: songImageCover,
        songurl: audioImageCover,
        artist: artistFilter,
        album:  albumFilter,
        language: languageFilter,
        category: filterTerm
    }
    saveNewSong(data).then((res) => {
        getAllSongs().then((data) => {
            dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs:data.Song,
              });
            
        })
    })

    setSongName(null)
    setIsAudioLoading(false)
    setIsImageLoading(false)
    setSongImageCover(null)
    setAudioImageCover(null)

   }
}
const saveArtist = () => {
  if(!artistImageCover || !artistName || !twitter || !Instagram) {
    alert("Please Upload Image and Artist Details")
  }
  else{
    setIsArtistUploading(true)
    const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram.com/${Instagram}`
    }
    SaveNewArtist(data).then((res) => {
      getAllArtist()
      .then((data) => {        
          dispatch({
              type: actionType.SET_ARTISTS,
              artists: data.artist,
            });
        })
    })
    setIsArtistUploading(false)
    setArtistImageCover(null)
    setArtistName("")
    settwitter("")
    setInstagram("")
    
  }
 
}
  return (
    <div className="flex  flex-col items-center justify-center p-4 border border-gray-300">
 <div >
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
                }  isLoading = {setIsAudioLoading} isImage = {true}/>
            ): (<div className="relative w-50% h-full flex justify-center items-center">
    <img src={songImageCover} className=" w-50% h-50%  border-8 border-gray-800 flex justify-center items-center rounded-xl" alt="Song cover" />
    <button className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none text-red-500 hover:text-red-400 duration-200 transition-all ease-in-out" onClick={() => deleteFile(songImageCover, true)}>
        <MdDelete/>
    </button>

</div>
)}
          </>
        )}
         
        </div>

      </div>

      {/* AUDIO */}

      <div className="bg-card w-full h-[300px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer ">
        <div className="w-full h-full flex items-center justify-center">
        {isAudioLoading && <FileLoader progress={audioUploadProgress}/>}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
                <FileUpLoader updateState={setAudioImageCover} setProgress ={
                    setAudioUploadProgress
                }  isLoading = {setIsAudioLoading} isImage = {false}/>
            ): (<div className="relative w-50% h-full flex justify-center items-center">
    <audio src={audioImageCover} controls className=" w-50% h-50%  border-8 border-gray-800 flex justify-center items-center rounded-xl" alt="Song cover" />
    <button className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none text-red-500 hover:text-red-400 duration-200 transition-all ease-in-out" onClick={() => deleteFile(audioImageCover, false)}>
        <MdDelete/>
    </button>

</div>
)}
          </>
        )}
         
        </div>

      </div>
      
      <div className="flex items-center justify-center w-73 p-4">
        <button>
          {isImageLoading || isAudioLoading ? (
              <DisabledButton/>
          ) :(
            <motion.button whileTap={{scale:0.75}} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg" onClick={ saveSong} >
                Save Song
            </motion.button>
          )}   
        </button>
      </div>
 </div>
  
{/* Artist image uploader */}
<p className="text-xl font-semibold text-textColor">Artist Details</p>

 <div className="bg-card w-full h-[300px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer ">
        <div className="w-full h-full flex items-center justify-center">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress}/>}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
                <FileUpLoader updateState={setArtistImageCover} setProgress ={
                    setArtistUploadingProgress
                }  isLoading = {setIsArtistUploading} isImage = {true}/>
            ): (<div className="relative w-50% h-full flex justify-center items-center">
    <img src={artistImageCover} className=" w-50% h-50%  border-8 border-gray-800 flex justify-center items-center rounded-xl" alt="Song cover" />
    <button className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none text-red-500 hover:text-red-400 duration-200 transition-all ease-in-out" onClick={() => deleteFile(artistImageCover, true)}>
        <MdDelete/>
    </button>

</div>
)}
          </>
        )}
         
        </div>

      </div>
      {/* artist name*/}


  <input type="text" placeholder="Type Your Artist Name..."  className="w-full p-3 rounded-md text-base font-semibold text-textcolor outline-none border border-gray-300 bg-transparent" value={artistName} onChange={(e) => setArtistName(e.target.value)}/>
  
  {/* twitter */}
  <div className="flex items-center p-1 rounded-md border border-gray-300 w-full ">
 <p className="text-base font-semibold text-gray-400 px-4 py-2">www.twitter.com/</p>
 <input type="text" placeholder="your twitter id..."  className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none  bg-transparent" value={twitter} onChange={(e) => settwitter(e.target.value)} />    
  </div>


    {/* instagram */}
    <div className="flex items-center p-1 rounded-md border border-gray-300 w-full ">
 <p className="text-base font-semibold text-gray-400 px-4 py-2">www.instagram.com/</p>
 <input type="text" placeholder="your insta id..."  className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none  bg-transparent" value={Instagram} onChange={(e) => setInstagram(e.target.value)} />    
  </div>



  <div className="flex items-center justify-center w-73 p-4">
        <button>
          {isArtistUploading ? (
              <DisabledButton/>
          ) :(
            <motion.button whileTap={{scale:0.75}} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg" onClick={ saveArtist} >
                Save Artist
            </motion.button>
          )}   
        </button>
      </div>
  
    </div>

    
  );
};

export const DisabledButton = () => {
    return (
      <button
        disabled
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        <svg
          role="status"
          className="inline w-4 h-4 mr-3 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Loading...
      </button>
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
