import { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";

import "./dashboard.scss";


export const Dashboard = () => {

    const [inputValue, setInputValue] = useState('');
    const [conexSocket, setConexSocket] = useState('');
    const { socket } = useSocket();

    useEffect(() => {
        if(socket) {
            socket.on('connected', (data) => {
                console.log('mirando el connected ==== ', data)
                setConexSocket(data.message);
            });
    
            socket.on('error', (data) => {
                console.log('mirando el error ==== ', data)
                setConexSocket(data.message);
            });
    
            return () => {
                socket.off('connected');
                socket.off('error');
            }
        }

    }, [socket]);

    const handleIInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const connectToTiktok = (e) => {
        e.preventDefault();
        socket.emit('connectToTiktok', inputValue);
    }

    return (
        <div className="dashboard">
            <h1>hola mundo desde dashboard</h1>

            <div className="content-data-principal">
                <h3>Acceso a tiktok</h3>

                <div className="form-access-tiktok">
                    <form onSubmit={connectToTiktok}>

                        <input
                            type="text"
                            placeholder="Usuario TikTok"
                            value={inputValue}
                            onChange={handleIInputChange}
                            className="input-form"
                        />

                        <button type="submit" className="button-form">Conectar</button>

                    </form>

                    <span>{conexSocket}</span>
                </div>
            </div>
        </div>
    )
}