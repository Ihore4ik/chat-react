import React from "react";
import {useLocation,Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const IsAuth = ({children}) => {
    const {authUser} = useSelector(state=>state.chat);
    const location = useLocation();

    if(!authUser){
        return <Navigate to="/login" state={{from: location}} />
    }
    return(
        children
    )
}

export default IsAuth;