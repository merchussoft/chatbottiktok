import { useEffect, useState } from "react";
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.8:3000';

const useSocket = () => {

    const [ socket, setSocket ] = useState(null);

    useEffect(() => {
        const new_socket = io(SOCKET_URL);

        setSocket(new_socket);

        return () => {
            new_socket.off('connected');
            new_socket.off('error');
        }

    }, [])

    return {
        socket
    }
}


export default useSocket;