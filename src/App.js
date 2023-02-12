import React, {useState} from 'react';
import './App.css';
import Modal from './Components/Modal/Modal';
import ChatRoom from './Components/Chatroom/ChatRoom';

function App() {

  const [isOpen, setIsOpen] = useState(true);
  const [chatroomIsOpen, setChatroomIsOpen] = useState(false);

  return (
    <>
      <Modal handleClose={() => {setIsOpen(false)}} isOpen={isOpen} handleChatroomIsOpen={() => {setChatroomIsOpen(true)}}/>
      <ChatRoom handleClose={() => {setChatroomIsOpen(false)}} handleLoginOpen={()=>{setIsOpen(true)}} chatroomIsOpen={chatroomIsOpen}/>
    </>
  );
}

export default App;
