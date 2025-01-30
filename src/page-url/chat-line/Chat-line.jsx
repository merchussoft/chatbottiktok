import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks';
import { ChatMessage } from '../../partials';

import './Chat_line.scss';

export const ChatLine = () => {

    const { socket } = useSocket();
    const [messages, setMessage] = useState([]);
    const chat_container_ref = useRef(null);

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

            socket.on('disconnected', (data) => {
                console.log('mirando el disconnected ==== ', data)
                localStorage.removeItem('socket_id')
            });
    
            return () => {
                socket.off('chat');
                socket.disconnect();
            }
        }
    }, [socket])

  return (

    <>
        <div className='overlay-general-url-line' >
            <div id="chat-container_line" ref={chat_container_ref}>
                {messages.map((message, i) =>(
                    <ChatMessage
                        key={i}
                        profilePictureUrl={message.profilePictureUrl}
                        nickname={message.nickname}
                        comment={message.comment}
                    />
                ))}
            </div>
        </div>
    </>
  )
}
