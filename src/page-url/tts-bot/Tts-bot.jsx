import { useEffect} from 'react';
import { useSocket,  useSpeechSynthesis } from '../../hooks';

export const TTSBot = () => {
    const { socket } = useSocket();
    const speak = useSpeechSynthesis();

    useEffect(() => {
        if(socket) {
            socket.on('chat', (data) => {
                speak(`${data.nickname} dice: ${data.comment}`)
            });

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
        <>
        </>
    )
}