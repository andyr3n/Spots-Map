import RoomIcon from '@mui/icons-material/Room';
import "./register.css";
import { React, useState, useRef } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false); 

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axios.post("/users/register", newUser);
            setFailure(false);
            setSuccess(true);
        } catch (error) {
            setFailure(true);
        }
    };

    return (
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon />
                SpotsMap
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} required />
                <input type="email" placeholder="Email" ref={emailRef} required />
                <input type="password" placeholder="Password" ref={passwordRef} required />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                />
                {passwordError && (
                    <span className="passwordError">Passwords do not match!</span>
                )}
                <button className='registerBtn'>Register</button>
                {success && (
                    <span className='success'>
                        Registration successful. You can log in now.
                    </span>
                )}
                {failure && (
                    <span className='failure'>
                        Something went wrong!
                    </span>
                )}
            </form>
            <ClearIcon className="registerCancel" onClick={()=>setShowRegister(false)}/>
        </div>
    );
}
