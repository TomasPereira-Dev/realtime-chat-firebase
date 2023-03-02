import modalStyles from "./modal.module.css";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
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

const Modal = ({isOpen, handleClose, handleChatroomIsOpen, handleRegisterOpen}) => {

    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(!isOpen){
        return null;
    };

    function handleChangeEmail(event){
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    function handleChangePassword(event){
        const newPassword = event.target.value;
        setPassword(newPassword);
    };


    function handleClickLogin(event){
        //sign in users with mail
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            //user signed in
            handleClose();
            handleChatroomIsOpen();
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setEmail("");
        setPassword("");
    }

    function KeydownLoginHandler(event){
        if(event.key === "Enter"){
            handleClickLogin();
        };
    };

    return (
        <div className={modalStyles.modalWrapper}>
            <div className={modalStyles.modalContainer}>
                <div className={modalStyles.imageAndLogoContainer}>
                    <div className={modalStyles.logoContainer}>
                        <h1>CHAT</h1>
                    </div>
                </div>
                <div className={modalStyles.loginContainer}>
                    <input type="email" placeholder="Email" onChange={handleChangeEmail}/>
                    <input type="password" placeholder="Password" onChange={handleChangePassword} onKeyDown={KeydownLoginHandler}/>
                    <div className={modalStyles.ButtonAndRegisterLinkContainer}>
                        <button className={modalStyles.registerButton} onClick={handleRegisterOpen}>Register</button>
                        <button type="button" onClick={handleClickLogin}>Log in</button>
                    </div>
                    <button>Login with google</button>
                </div>
            </div>
        </div>
    )
}; 

export default Modal;