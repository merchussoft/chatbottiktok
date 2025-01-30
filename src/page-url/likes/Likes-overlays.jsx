import { useEffect, useState } from "react";
import { useSocket } from '../../hooks';
import './likes-overlay.scss'

export const LikesOverlay = () => {

    const [countLikes, setCountLikes] = useState('');
    const [showLike, setShowLike] = useState(false);
    const { socket } = useSocket();


    useEffect(() => {

        if(socket) {
            socket.on('like', ({totalLikeCount}) => {
                console.log('mirando el contador de likes', totalLikeCount)
                setCountLikes(totalLikeCount)
                setShowLike(true)

                setTimeout(() => setShowLike(false), 1500);
            })

            return () => {
                socket.off('like');
                socket.disconnect();
            }
        }
    }, [socket])


    return (
        <>
            <div className="likeIconContainer">
                <span className={!showLike ? 'likeIcon' : 'showLike'}>
                    ❤️
                </span> {countLikes}
            </div>
        </>
    )
}