
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import Button from '../Button';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 2. Hook Initialize karein

    const logoutHandler = () => {
        // 3. Correction: authService.logout() <-- Brackets lagayein
        
         //  appwrite me authservice me logout return promise so we used then to handle it
        authService.logout().then(() => {
             //  reducer ko btaya ki logo ut ho gya and uski state chaneg hui
            // 4. Correction: dispatch(logout()) <-- Brackets lagayein
            dispatch(logout());
            
            // 5. User ko Home page par bhejein
            navigate('/'); 
        });
    };

    return (
        <Button
            className="inline-block px-6 py-2 duration-200 
                     text-white font-medium rounded-full 
                     hover:bg-slate-800 hover:text-teal-400"
            onClick={logoutHandler}
        >
            Logout
        </Button>
    );
}

export default LogoutBtn;