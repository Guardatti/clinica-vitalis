import React, { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Aside from '../aside/Aside';
import './layout.css'


interface LayoutProps {
    children: ReactNode
}


const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [asideOpen, setAsideOpen] = useState<boolean>(true);

    const { pathname } = useLocation();

    const toggleAside = () => { 
        setAsideOpen(!asideOpen)
    }

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pathname])

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 769) {
                setAsideOpen(false)
            } else {
                setAsideOpen(true)
            }
        }

        window.addEventListener('resize', handleResize)

    }, [])

    return (
        <div className='container-layout'>
            <Aside isOpen={asideOpen}/>
            <div className='container-layout-1'>
                <Navbar toggleAside={toggleAside} isOpen={asideOpen}/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
