import chatStyles from "./chat.module.css";
import {useEffect, useState, useLayoutEffect, useRef} from "react";
import {initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import {getDatabase, push, ref, onChildAdded} from 'firebase/database';

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

const Chat = ({handleClose, handleLoginOpen, chatroomIsOpen}) =>{

    const [fetchedMessages, setFetchedMessages] = useState([]); // save fetched messages to display them later using the map method
    const inputRef = useRef("");
    const chatRef = useRef(null);
    const sendButtonRef = useRef(null);
    

    const handleClickSend = () => {
        //send messages to database
        if(inputRef.current.value){
            sendButtonRef.current.disable = "false";
            push(ref(database, "messages"),{
                user: auth.currentUser.displayName,
                message: inputRef.current.value,
                uidOfMessage: auth.currentUser.uid,
            });
            inputRef.current.value = "";
        };
    };

    function handleEnterSend(event){
        if(event.key === "Enter" && inputRef.current.value){
            handleClickSend();
        };
    };

    useEffect(() => { //fetch messages from the database
        let messages = [];
            const messagesRef = ref(database, "messages"); //firebase reference to the database directory
            onChildAdded(messagesRef, (snapshot) => {
                //fetches messages
                let snapshotMessage = snapshot.val().message;
                let snapshotUser = snapshot.val().user;
                let snapshotUid = snapshot.val().uidOfMessage;
                let newMessage =  {
                    message:  `${snapshotUser}: ${snapshotMessage}`,
                    uidOfMessage: snapshotUid
                    };
                messages = [...messages, newMessage]
                setFetchedMessages(messages);
                })
    }, []);

    useLayoutEffect(() => {
        if(chatRef.current && chatRef.current !== null){
            chatRef.current.scrollIntoView({behavior:"smooth"});
        };
    }, []);

    if(!chatroomIsOpen){
        return null;
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
        <div className={chatStyles.chatWrapper}>
            <div className={chatStyles.chatContainer}>
                <div className={chatStyles.signOutButtonContainer}>
                    <button onClick={handleLogOut}>sign out</button>
                </div>
                <div className={chatStyles.messageContainer}>
                    <div className={chatStyles.messageList}>
                        {auth.currentUser !== null ? (fetchedMessages.map((renderedMsg, index) => (
                            renderedMsg.uidOfMessage !== auth.currentUser.uid ? (
                            <div className={chatStyles.theirMsg} key={index}>
                                <span>{ `${renderedMsg.message}`}</span>
                            </div>
                            ) : (
                            <div className={chatStyles.myMsg} key={index}>
                                <span>{`${renderedMsg.message}`}</span>
                            </div> 
                            )
                            ))
                            ) : (
                            console.log("please log in")
                            )  
                        }
                        <div ref={chatRef}/>
                    </div>
                    <div className={chatStyles.chatInputAndButtonContainer}>
                        <input type="text" onKeyDown={handleEnterSend} ref={inputRef}/>
                        <button type="button" onClick={handleClickSend} disable="true" ref={sendButtonRef}>Send</button>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;