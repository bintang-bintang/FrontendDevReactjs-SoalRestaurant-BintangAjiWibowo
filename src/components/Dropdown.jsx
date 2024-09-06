import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";


const Dropdown = ({ children, Kontenmenu }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <div className="relative h-fit w-fit ">
            <button
                onClick={toggleMenu}
                onBlur={() => setOpen(false)} // Menutup dropdown ketika focus hilang
                className="relative flex gap-5 items-center"
            >
                {children}
                <RiArrowDropDownLine/>
            </button>
            <span className='absolute h-[2px] bg-blue-300 left-0 right-0 -bottom-1 origin-left'/>
            {open && (
                <div className="absolute right-0 bg-white shadow-md top-7 z-10">
                    {Kontenmenu} {/* Render komponen Kontenmenu dengan children yang diisi */}
                </div>
            )}
        </div>
    );
}

export default Dropdown