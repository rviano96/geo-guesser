import React from 'react'
import { Navigate } from "react-router-dom";
import { LOGIN_PAGE_PATH } from '../../Constants';
interface IProtected {
    children: any,
    isLoggedIn: boolean
}


const Protected: React.FC<IProtected> = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to={LOGIN_PAGE_PATH} replace />;
    }
    return children
}

export default Protected