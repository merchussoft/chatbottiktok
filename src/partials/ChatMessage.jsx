export const ChatMessage = ({nickname, profilePictureUrl, comment}) => {
    return (
        <>
            <div className="chat-message">
                <span className="user-info">
                    <span className="badge">
                        <img src={profilePictureUrl} alt={nickname} />
                    </span>
                    <span className="username">{nickname}</span>
                    <span className="colon">:</span>
                    <span className="message-content">
                        {comment}
                    </span>
                </span>
            </div>
        </>
    )
}