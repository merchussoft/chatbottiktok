import { useEffect, useState } from "react";
import io from 'socket.io-client';

//const SOCKET_URL = 'https://tiktokchatapi.onrender.com';
//const SOCKET_URL = 'http://127.0.0.1:3000';
const SOCKET_URL = 'http://192.168.1.50:3041';

export const useSocket = () => {

    const [ socket, setSocket ] = useState(null);

    useEffect(() => {
        const storage_socket_id = localStorage.getItem('socket_id');

        if(storage_socket_id) {
            const existingSocket = io(SOCKET_URL, { query: { socketId: storage_socket_id } });
            setSocket(existingSocket);
        } else {
            const new_socket = io(SOCKET_URL);
            setSocket(new_socket);
            return () => {
                new_socket.off('connected');
                new_socket.off('error');
            }
        }
    }, [])

    return {
        socket
    }
}