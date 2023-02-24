import React from "react";
import PortalLogin from "../PortalLogin";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from 'firebase/database';
import styles from "./modalStyles.module.css";
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

function Modal ({isOpen, handleClose, handleChatroomIsOpen}){

    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState("");
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

    function handleChangeUsername(event){
        const newUsername = event.target.value;
        setUsername(newUsername);
    };

    //register new users with mail
    const auth = getAuth();
    const database = getDatabase();


    function handleClickSignUp(event){
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
                //user registered
                updateProfile(auth.currentUser, {
                displayName: username,
                })
            })
        setEmail("");
        setPassword("");
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
           <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.title}>
                        <h1>Tomás Pereira's Chat App</h1>
                    </div>
                    <div className={styles.loginRegisterContainer}>
                        <div className={styles.registerContainer}>
                            <h2>Not Registered Yet?</h2>
                            <input className={styles.signUpUsername} type="text" placeholder="Username" onChange={handleChangeUsername}/>
                            <input className={styles.signUpEmail} type="email" placeholder="Email" onChange={handleChangeEmail}/>
                            <input className={styles.signUpPassword} type="password" placeholder="Password" onChange={handleChangePassword} onKeyDown={KeydownRegisterHandler}/>
                            <button className={styles.modalBtn} type="button" onClick={handleClickSignUp}>Sign up</button>
                        </div>
                        <div className={styles.loginContainer}>
                            <h2>Log In</h2>
                            <input className={styles.mailPasswordContainer}  type="email" placeholder="Email" onChange={handleChangeEmail}/>
                            <input className={styles.mailPasswordContainer}  type="password" placeholder="Password" onChange={handleChangePassword} onKeyDown={KeydownLoginHandler}/>
                            <button className={styles.modalBtn}  type="button" onClick={handleClickLogin}>Log In</button>
                        </div>
                    </div>
                </div>
           </div>
        </PortalLogin>
    );
}

export default Modal;