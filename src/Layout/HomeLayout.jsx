import React , {useMemo} from 'react'
import Home from '../WebPages/Home'
import Navbar from '../components/common/Navbar'
import { getCurrentUser } from '../API/FirestoreAPI'

export default function HomeLayout() {
  const [currentUser , setCurrentUser] = React.useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser); 
  } , [])
  return (
    <div>
        <Navbar currentUser={currentUser}/>
        <Home currentUser={currentUser}/>
    </div>
  )
}
