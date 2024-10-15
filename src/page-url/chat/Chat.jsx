import { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket';

import './Chat.scss';

export const Chat = () => {

    const { socket } = useSocket();
    const [messages, setMessage] = useState([]);
    const chat_container_ref = useRef(null);

    const scrollTo = () => {
        if (chat_container_ref.current) {
            // Desplazar el contenedor completamente hacia la derecha
            chat_container_ref.current.scrollTo({
                top: chat_container_ref.current.scrollHeight,
                behavior: 'smooth' // Para un desplazamiento suave
            });
        }
    }
 

    useEffect(() => {
        if(socket) {
            socket.on('chat', (data) => {
                setMessage(prevMessages => [...prevMessages, data]);
                scrollTo();
            })
    
            return () => {
                socket.disconnect();
            }
        }
    }, [socket])

  return (
    <div className='overlay-general-url' >
        <div id="chat-container" ref={chat_container_ref}>

            {messages.map((message, i) =>(
                <div className="chat-line" key={i}>
                    <span className="user-info">
                        <span className="badge">
                            <img src={message.profilePictureUrl} alt={message.nickname} />
                        </span>

                        <span className="username">
                        {message.nickname}
                        </span>

                        <span className="colon">:</span>

                        <span className="message-content">
                            {message.comment}
                        </span>
                </span>
            </div>

            ))}
            

        </div>
    </div>
  )
}
