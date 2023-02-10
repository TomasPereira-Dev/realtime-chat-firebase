import React from "react";
import PortalLogin from "../PortalLogin";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getDatabase, push, ref, set} from 'firebase/database';
import "./modalStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
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

function Modal ({isOpen, handleClose, handleUsernameOpen}){

    const provider = new GoogleAuthProvider();
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

    //register new users with mail
    const auth = getAuth();
    const database = getDatabase();

    function handleClickSignUp(event){
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            //user registered
                push(ref(database, `users/`), {
                    user: auth.currentUser.uid,
                    uid: auth.currentUser.uid,
                    userEmail: auth.currentUser.email,
                    }
                );
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setEmail("");
        setPassword("");
    };

    function handleClickLogin(event){
        //sign in users with mail
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            //user signed in
            handleClose();
            handleUsernameOpen();
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setEmail("");
        setPassword("");
    };

    //sign in users with a google account
    function handleClickGoogleSignUp(event){
        signInWithPopup(auth, provider)
        .then((result)=>{
            //signed in user info
            const user = result.user;
            set(ref(database, "users/"), {
                user: user,
                }
            );
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        });
    };

    function KeydownLoginHandler(event){
        if(event.key === "Enter"){
            handleClickLogin();
        };
    };

    function KeydownRegisterHandler(event){
        if(event.key === "Enter"){
            handleClickSignUp();
        };
    };


    return(
        <PortalLogin wrapperId="portal-modal-container">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-title-container">
                        <div className="modal-title">
                            <h1 className="modal-title-h1">Tomás Pereira's</h1>
                            <h1 className="modal-title-h1">Chat App</h1>
                        </div>
                        
                        <div className="sign-up-methods-container">
                            <div className="sign-up-methods">
                                <div className="register-container">
                                    <h2>Not registred yet?</h2>
                                    <form className="register-form">
                                        <div className="sign-up-email-container">
                                            <input className="sign-up-email" type="email" placeholder="Email" onChange={handleChangeEmail}/>
                                        </div>
                                        <div className="sign-up-password-container">
                                            <input className="sign-up-password" type="password" placeholder="Password" onChange={handleChangePassword} onKeyDown={KeydownRegisterHandler}/>
                                        </div>
                                        <div className="sign-up-btn-container">
                                            <button className="modal-btn sign-up-btn" type="button" onClick={handleClickSignUp}>Sign up</button>
                                        </div>
                                    </form>
                                </div>

                                <div className="vertical-line"/>

                                <div className="mail-auth-container">
                                    <form className="mail-auth-form">
                                        <h2>Log In</h2>
                                        <div>
                                            <input className="mail-password-container"  type="email" placeholder="Email" onChange={handleChangeEmail}/>
                                        </div>
                                        <div>
                                            <input className="mail-password-container"  type="password" placeholder="Password" onChange={handleChangePassword} onKeyDown={KeydownLoginHandler}/>
                                        </div>
                                        <div>
                                            <button className="modal-btn log-in-btn"  type="button" onClick={handleClickLogin}>Log In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="auth-container">
                            <h3>or</h3>
                            <button className="modal-btn auth-btn" onClick={handleClickGoogleSignUp}>Sign in with Google <FontAwesomeIcon icon={faGoogle}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLogin>
    );
}

export default Modal;