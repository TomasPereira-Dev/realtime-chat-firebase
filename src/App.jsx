import './App.css';
import Modal from './Components/Modal/Modal';
import Chat from "./Components/Chat/Chat";
import Register from "./Components/Register/Register";
import { useState } from 'react';

function App() {

  const [isOpen, setIsOpen] = useState(true);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [chatroomIsOpen, setChatroomIsOpen] = useState(false);

  return (
    <>
      <Register registerIsOpen={registerIsOpen} handleClose={() => {setRegisterIsOpen(false)}} handleLoginOpen={()=>{setIsOpen(true)}} />
      <Modal handleClose={() => {setIsOpen(false)}} isOpen={isOpen} handleChatroomIsOpen={() => {setChatroomIsOpen(true)}} handleRegisterOpen={() => {setRegisterIsOpen(true) 
      setIsOpen(false)}}/>
      <Chat handleClose={() => {setChatroomIsOpen(false)}} handleLoginOpen={()=>{setIsOpen(true)}} chatroomIsOpen={chatroomIsOpen}/>
    </>

  )
}

export default App
