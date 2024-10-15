import { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket';

import './Chat_line.scss';

export const ChatLine = () => {

    const { socket } = useSocket();
    const [messages, setMessage] = useState([]);
    const chat_container_ref = useRef(null);

    const scrollToBottom = () => {
        if (chat_container_ref.current)  chat_container_ref.current.scrollLeft = chat_container_ref.current.scrollWidth;;
    }

    const scrollTo = () => {
        if (chat_container_ref.current) {
            // Desplazar el contenedor completamente hacia la derecha
            chat_container_ref.current.scrollTo({
                left: chat_container_ref.current.scrollWidth,
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
    <div className='overlay-general-url-line' >
        <div id="chat-container_line" ref={chat_container_ref}>

            {messages.map((message, i) =>(
                <div className="chat-message-line" key={i + 1}>
                    <span className="user-info-line">
                        <span className="badge-line">
                            <img src={message.profilePictureUrl} alt={message.nickname} />
                        </span>

                        <span className="username-line">
                        {message.nickname}
                        </span>

                        <span className="colon-line">:</span>

                        <span className="message-content-line">
                            {message.comment}
                        </span>
                </span>
            </div>

            ))}
            

        </div>
    </div>
  )
}
