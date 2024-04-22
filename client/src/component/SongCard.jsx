import React from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
const SongCard = (data, index) => {
  console.log(data)
  return (
    <motion.div className="relative w-40 min-w-210 px-2  cursor-pointer bg-gray-500 py-4 rounded-lg shadow-md flex flex-col items-center">
<motion.img whileHover={{scale:1.4}} src={data.data.imageURL}
className="w-40 h-40 object-cover rounded-lg"  alt=""/>

<p>{data.data.name.length > 20 ? data.data.name.slice(0, 20) + "..." : data.data.name}</p>
<p>{data.data.artist.length > 20 ? data.data.artist.slice(0, 20) + "..." : data.data.artist}</p>
<div>
    <motion.i whileTap={{scale:0.75}} className="absolute bottom-2 left-2 text-red-800 hover:text-red-600">
        <IoTrash/>
    </motion.i>
</div>
      
    </motion.div>
  );
};

export default SongCard;
