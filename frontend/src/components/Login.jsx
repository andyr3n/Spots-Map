import RoomIcon from '@mui/icons-material/Room';
import "./login.css";
import { React, useState, useRef } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setFailure(false);
        } catch (error) {
            setFailure(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon />
                SpotsMap
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} required />
                <input type="password" placeholder="Password" ref={passwordRef} required />
                <button className='loginBtn'>Login</button>
                {failure && (
                    <span className='failure'>
                        Something went wrong!
                    </span>
                )}
            </form>
            <ClearIcon className="loginCancel" onClick={()=>setShowLogin(false)}/>
        </div>
    );
}