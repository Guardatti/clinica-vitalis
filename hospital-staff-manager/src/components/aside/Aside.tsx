import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import './aside.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { asideWithCurrentUser, asideWithoutCurrentUser } from '../../utils/aside';
import { setCurrentUser } from '../../redux/user/userSlice';


interface Props {
    isOpen: boolean
}


const Aside: React.FC<Props> = ({ isOpen }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })

    const currentUser = useAppSelector(state => state.user.currentUser)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

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
                        currentUser ?
                        asideWithCurrentUser.filter((z) => z.text !== "Cerrar sesión").map((x) => {
                            return(
                                <li key={x.id}>
                                    <Link to={x.to} className='aside-link'>{React.createElement(x.icon)}{x.text}</Link>
                                </li>
                            )
                        })
                        :
                        asideWithoutCurrentUser.map((x) => {
                            return(
                                <li key={x.id}>
                                    <Link to={x.to} className='aside-link'>{React.createElement(x.icon)}{x.text}</Link>
                                </li>
                            )
                        })
                    }
                    { currentUser &&
                        <li>
                            <span className='aside-link' style={{cursor: "pointer"}} onClick={() => {dispatch(setCurrentUser(null)) ; navigate('/cuenta/inicio-de-sesion')}}><FaSignOutAlt />Cerrar sesión</span>
                        </li>
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
