import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const user = useSelector(state => state.userData.user);
    return (
        user?.role === "Admin" ? <Outlet /> : <Navigate to="/current-jobs" />
    )
}
export default PrivateRoutes;