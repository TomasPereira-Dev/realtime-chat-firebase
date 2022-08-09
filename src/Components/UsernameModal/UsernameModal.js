import PortalUsername from "../PortalUsername";
import React, {useRef} from "react";
import "./usernameModal.css";

const UsernameModal = ({handleUsername, usernameIsOpen, handleClose, handleChatroomOpen}) => {

    const usernameRef = useRef(null);
    const okButtonRef = useRef(null);

    if(!usernameIsOpen){
        return  null;
    };

    function handleClickOk(){
        if(usernameRef.current.value){
            okButtonRef.current.disable = false;
            okButtonRef.current.disabled = false;
            handleClose();
            handleChatroomOpen();                
        } else {
            alert("Choose a username");
        };
    };

    function KeydownOkHandler(event){
        if(event.key === "Enter" && usernameRef.current.value){
            handleClickOk();
        }else if(event.key === "Enter" && !usernameRef.current.value) {
            alert("Choose a username");
        };
    };


    return(
        <PortalUsername wrapperId="portal-username-container">
            <div className="afterLoginUsernameModalContainer">
                <div className="afterLoginUsernameModal">
                    <div className="username-modal-h1">
                        <h1 >Please choose a username</h1>
                    </div>

                    <div className="username-in-modal-container">
                        <input type="text" placeholder="username" onChange={handleUsername} onKeyDown={KeydownOkHandler} ref={usernameRef}/>
                        <button type="button" onClick={handleClickOk} ref={okButtonRef} disable="true">OK!</button>
                    </div>
                </div>
            </div>
        </PortalUsername>
    );
}

export default UsernameModal;