import React from 'react'
import './navbar.css'
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useMediaQuery } from 'usehooks-ts';


interface Props {
    toggleAside: () => void
    isOpen: boolean
}


const Navbar: React.FC<Props> = ({ toggleAside, isOpen }) => {

    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <header>
            <div className='container-header-icons'>
            {
                isOpen ?
                <IoClose className='cross-icon' onClick={toggleAside}/>
                :
                <FiMenu className='menu-icon' onClick={toggleAside}/>
            }
            </div>
            {
                (!isMobile || !isOpen) && 
                <div className='container-header-h2'>
                    <h2>Clínica</h2>
                </div>
            }
        </header>
    )
}

export default Navbar
