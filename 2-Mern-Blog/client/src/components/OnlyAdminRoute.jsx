import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const OnlyAdminRoute = () => {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default OnlyAdminRoute