import React, { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sound/notification.mp3'

const useListenMessages = () => {
   
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage");// helps to listen the event only once
    },[socket,setMessages, messages])
}

export default useListenMessages
