import { useEffect, useRef, useState} from 'react';
import { useSocket,  useSpeechSynthesis} from '../../hooks';
import { ChatMessage } from '../../partials';

import './Chat.scss';

export const ChatHorizontal = () => {

    const { socket } = useSocket();
    const [messages, setMessage] = useState([]);
    const chat_container_ref = useRef(null);
    const speak = useSpeechSynthesis();

    const scrollToBottom  = () => {
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
                speak(`${data.nickname} dice: ${data.comment}`)
                scrollToBottom ();
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
    }, [socket, speak])

  return (
    <div className='overlay-general-url' >
        <div id="chat-container" ref={chat_container_ref}>
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
  )
}
