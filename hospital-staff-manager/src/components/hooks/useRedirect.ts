import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { useEffect } from "react";



export const useRedirect = (redirecTo: string) => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const navigate = useNavigate();

    useEffect(() => {

        if (currentUser) {
            navigate(redirecTo)
        }

    }, [currentUser, navigate, redirecTo])

}