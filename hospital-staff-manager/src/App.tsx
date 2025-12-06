import { useEffect } from 'react';
import './css/global.css'
import './index.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import Routes from './routes/Routes'
import { setCurrentUser } from './redux/user/userSlice';
import { jwtDecode } from 'jwt-decode';



function App() {

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(state => state.user.currentUser);


  useEffect(() => {

    if (currentUser?.token) {

      try {
        
        const decoded = jwtDecode(currentUser.token)

        const currentTime = Date.now() / 1000

        if (decoded.exp && decoded.exp < currentTime) {
          // Token expirado
          dispatch(setCurrentUser(null))
        }

      } catch (error) {
        // Por si el token llega a estar corrupto.
        dispatch(setCurrentUser(null))
        console.log(error);
      }

    }

  }, [currentUser?.token, dispatch])

  return (
    <Routes />
  )
}

export default App
