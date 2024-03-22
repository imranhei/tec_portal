import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const user = useSelector(state => state.userData.user);
    return (
        user?.role === "Super Admin" ? <Outlet /> : <Navigate to="/" />
    )
}
export default PrivateRoutes;