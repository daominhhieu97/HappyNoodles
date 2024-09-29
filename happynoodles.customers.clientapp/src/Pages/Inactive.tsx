import React from "react";
import { useNavigate } from "react-router-dom";

const Inactive = () => {
    const navigate = useNavigate();
    
    const redirectToHome = () => {
        navigate('/')
    }
    
    return (
        <>
            <div>Your account is inactive. Please contact to 0925098044 to active your account again.</div>
            <button onClick={redirectToHome}>Redirect to welcome page</button>
        </>
    );
}

export default Inactive;