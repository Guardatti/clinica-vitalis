import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from "react-icons/fa";
import './aside.css'
import { aside } from '../../utils/aside';


interface Props {
    isOpen: boolean
}


const Aside: React.FC<Props> = ({ isOpen }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })

    useEffect(() => {

        if (theme === 'dark') {

        document.body.classList.add('dark');

        localStorage.setItem('theme', 'dark');

        } else {

        document.body.classList.remove('dark');

        localStorage.setItem('theme', 'light');

        }
        
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <aside className={`aside ${isOpen ? 'aside-open' : ''}`}>
            <div>
                <h2>Vitalis</h2>
            </div>
            <nav>
                <ul>
                    {
                        aside.map((x) => {
                            return(
                                <li key={x.id}>
                                    <Link to={x.to} className='aside-link'>{React.createElement(x.icon)}{x.text}</Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        <button onClick={toggleTheme} className='aside-button'>
                            {theme === 'dark' ? <FaSun /> : <FaMoon />}
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Aside
