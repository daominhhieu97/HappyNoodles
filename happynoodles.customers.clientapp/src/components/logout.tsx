import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice.tsx";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    
    function handleLogOut(): void {
        //raise log out event
        dispatch(logout());
        //navigate to login page
        navigator('/');
    }

    return (
        <Button sx={{ mt: 2 }} onClick={handleLogOut} color='error'>Logout</Button>
    );
}
export default Logout;