import registerStyles from "./register.module.css";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyA994Q-JUU7EYwvHBw4pGVNXAbJcK1slHk",
    authDomain: "chat-app-4fca2.firebaseapp.com",
    projectId: "chat-app-4fca2",
    storageBucket: "chat-app-4fca2.appspot.com",
    messagingSenderId: "38331598525",
    appId: "1:38331598525:web:1a1088c4dd41fc71b899d4",
    measurementId: "G-NFJ477BRYQ",
    databaseURL: "https://chat-app-4fca2-default-rtdb.firebaseio.com/"
  };

initializeApp(firebaseConfig);

const Register = ({registerIsOpen, handleLoginOpen, handleClose}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleChangeEmail(event){
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    function handleChangePassword(event){
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    function handleChangeUsername(event){
        const newUsername = event.target.value;
        setUsername(newUsername);
    };

        //register new users with mail
        const auth = getAuth();
    
        function handleClickSignUp(event){
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                    //user registered
                    updateProfile(auth.currentUser, {
                    displayName: username,
                    })
                    handleLoginOpen();
                    handleClose();
                })
            setEmail("");
            setPassword("");
        };
        
        function KeydownRegisterHandler(event){
            if(event.key === "Enter"){
                handleClickSignUp();
            };
        };

    if(!registerIsOpen){
        return null;
    };

    return(
        <div className={registerStyles.registerWrapper}>
            <div className={registerStyles.registerContainer}>
                <h1>Welcome</h1>
                <input type="email" placeholder="Your Email Here" onChange={handleChangeEmail} onKeyDown={KeydownRegisterHandler}/>
                <input type="username" placeholder="Your Username Here" onChange={handleChangeUsername} onKeyDown={KeydownRegisterHandler}/>
                <input type="password"  placeholder="You Password Here" onChange={handleChangePassword} onKeyDown={KeydownRegisterHandler}/>
                <button type="button" onClick={handleClickSignUp}>Register</button>
            </div>
        </div>
    );
};

export default Register;