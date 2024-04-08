import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion } from "framer-motion"

const FilterButtons = ({ filterData, flag }) => {
    const [filterName, setFilterName] = useState(null)
    const [filterMenu, setFilterMenu] = useState(false)

    const toggleFilterMenu = () => {
        setFilterMenu(!filterMenu)
    }

    return (
        <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400' onClick={toggleFilterMenu}>
            <p className='text-base text-textColor tracking-wide flex items-center gap-2'>
                {!filterName && flag}
                <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? 'rotate-180' : ''}`} />
            </p>

            {filterData && filterMenu && (
                <motion.div className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0">
                    hi
                </motion.div>
            )}
        </div>
    )
}

export default FilterButtons
