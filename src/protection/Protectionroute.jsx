
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectetRouting(propes) {

    if (localStorage.getItem('Token')) {
        return (propes.children)
    } else {
        return <Navigate to={'/Login'}></Navigate>
    }



}

export default ProtectetRouting