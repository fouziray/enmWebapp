import React, { createContext, useContext, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000/' || window.location.host);

const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    
    const value = {
        socket,
        userName,
        setUserName,
        setCurrentRoom,
        currentRoom
    };
    
    return (
        <ChatContext.Provider value={ value }>
            { children }
        </ChatContext.Provider>
    );
};