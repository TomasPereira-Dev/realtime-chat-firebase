import React, {useCallback, useEffect, useLayoutEffect, useRef} from "react";
import {initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import {getDatabase, push, ref, onChildAdded} from 'firebase/database';
import "./chatroomStyles.css";

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

const database = getDatabase();
const auth = getAuth();

function ChatRoom({handleClose, handleLoginOpen, chatroomIsOpen, username}){
    const [message, setMessage] = React.useState("");
    let fetchedStuffRef = useRef([]); // save fetched messages to display them later using the map method
    const inputRef = useRef("");
    const chatRef = useRef(null);
    const sendButtonRef = useRef(null);
    
    const handleClickSend = useCallback(() => {
        //send messages to database
        if(inputRef.current.value){
            sendButtonRef.current.disable = "false";
            push(ref(database, "messages"),{
                user: auth.currentUser.uid,
                userName: username,
                message: message,
            });
            inputRef.current.value = "";
        };
    }, [message, username])
    



    function handleEnterSend(event){
        if(event.key === "Enter" && inputRef.current.value){
            handleClickSend();
        };
    };

    useEffect(() => { //fetch messages from the database
        const messagesRef = ref(database, "messages"); 
        onChildAdded(messagesRef, (snapshot) => {
            //fetches messages
            let snapshotMessage = snapshot.val().message;
            let snapshotUserName = snapshot.val().userName;
            let snapshotUid = snapshot.val().user;

            let newMessage =  {
                                message: snapshotUserName + ': ' + snapshotMessage,
                                uidOfMessage: snapshotUid,
                                };

            fetchedStuffRef.current = [...fetchedStuffRef.current, newMessage];
        });
    }, []);

    useLayoutEffect(() => {
        if(chatRef.current && chatRef.current !== null){
            chatRef.current.scrollIntoView({behavior:"smooth"});
        };
    }, [handleClickSend]);

    if(!chatroomIsOpen){
        return null;
    };

    function handleChangeMessage(event){    
        setMessage(event.target.value);
    };

    function handleLogOut(){
        signOut(auth).then(()=> {
            handleClose();
            handleLoginOpen()
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
    };

    return(
        <>
        <div className="chatroom-wrapper">
            <div className="chatroom-container">
                <div className="sign-out-and-options-btn-container">
                    <div className="options-btn-container">
                        <button type="button">Options</button>
                    </div>

                    <div className="sign-out-btn-container">
                        <button type="button" className="sign-out-btn" onClick={handleLogOut}>Sign out</button>
                    </div>
                </div>

                <div className="chat-container">
                    <div className="message-list">
                        {auth.currentUser !== null ? (fetchedStuffRef.current.map((renderedMsg, index) => (
                            renderedMsg.uidOfMessage !== auth.currentUser.uid ? (
                            <div className="msg their-msg" key={index}>
                                <span>{ `${renderedMsg.message}`}</span>
                            </div>
                            ) : (
                            <div className="msg my-msg" key={index}>
                                <span>{`${renderedMsg.message}`}</span>
                            </div> 
                            )
                        ))
                        ) : (
                            console.log("please log in")
                        )   
                    };
                        <div className="auto-scroll" ref={chatRef}/>
                    </div>

                    <div className="input-button-container">
                        <div className="input-and-button">
                            <div className="message-form">
                                <div className="message-input-container">
                                    <input className="message-input" placeholder="write a message" onKeyDown={handleEnterSend} onChange={handleChangeMessage} ref={inputRef}/>
                                </div>
                                <div className="send-btn">
                                    <button type="button" onClick={handleClickSend} ref={sendButtonRef} disable="true">SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ChatRoom;