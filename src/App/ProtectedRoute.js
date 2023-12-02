import { Outlet } from 'react-router'
import { useContext } from 'react';
import { AccountContext } from '../Store/AccountContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = props => {

    const { isAuth } = useContext(AccountContext);
    return (isAuth ? (
        <Outlet />
    ) : <Navigate to="/login" />)
};


export default ProtectedRoute;