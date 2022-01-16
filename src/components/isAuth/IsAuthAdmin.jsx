import React from "react";
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const IsAuthAdmin = ({children}) => {
    const {authUser} = useSelector(state => state.chat);
    const location = useLocation();

    if (!authUser) {
        return <Navigate to="/login" state={{from: location}}/>
    }
    if (authUser.role !== "Admin") {
        return <h2>Sorry, this page is for admin only!</h2>
    }
    return children

}

export default IsAuthAdmin;