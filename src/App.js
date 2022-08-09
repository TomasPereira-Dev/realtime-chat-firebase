import React, {useState} from 'react';
import './App.css';
import Modal from './Components/Modal/Modal';
import UsernameModal from './Components/UsernameModal/UsernameModal';
import ChatRoom from './Components/Chatroom/ChatRoom';

function App() {

  const [isOpen, setIsOpen] = useState(true);
  const [usernameIsOpen, setUsernameIsOpen] = useState(false);
  const [chatroomIsOpen, setChatroomIsOpen] = useState(false);
  const [username, setUsername] = React.useState("");

  return (
    <>
      <Modal handleClose={() => {setIsOpen(false)}} isOpen={isOpen} handleUsernameOpen={() => {setUsernameIsOpen(true)}}/>
      <UsernameModal handleClose={() => {setUsernameIsOpen(false)}} handleUsername={(event) => {setUsername(event.target.value)}} usernameIsOpen={usernameIsOpen} handleChatroomOpen={() => {setChatroomIsOpen(true)}}/>
      <ChatRoom handleClose={() => {setChatroomIsOpen(false)}} handleLoginOpen={()=>{setIsOpen(true)}} username={username} chatroomIsOpen={chatroomIsOpen}/>
    </>
  );
}

export default App;
