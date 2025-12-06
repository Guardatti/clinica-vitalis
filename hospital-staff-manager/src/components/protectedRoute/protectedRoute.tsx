import React, { useEffect, type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { setCurrentUser } from '../../redux/user/userSlice';


interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo: string;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, redirectTo}) => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const dispatch = useAppDispatch();

    let isExpired = false;

    if (currentUser?.token) {

        try {
            
            const decode = jwtDecode(currentUser?.token)

            const currentTime = Date.now() / 1000

            if (decode.exp && decode.exp < currentTime) {
                isExpired = true;
            }

        } catch (error) {
            console.log(error);
            isExpired = true;
        }

    }

    useEffect(() => {

        if (currentUser?.token && isExpired) {

            dispatch(setCurrentUser(null))

        }

    }, [currentUser?.token, isExpired, dispatch])

    if (!currentUser?.token || isExpired) {

        return <Navigate to={redirectTo}/>

    } else {
        return children
    }

}

export default ProtectedRoute