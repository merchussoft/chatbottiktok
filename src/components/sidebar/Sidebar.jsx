import { Link } from 'react-router-dom';
import './sidebar.scss'

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Tiktokbot</h2>

            <ul>
                <i>
                    <Link to="/">dashboard</Link>
                </i>
                <i>
                    <Link to="/overlayobs">Overlay Obs</Link>
                </i>

                <i>
                    <Link to="/tts">TTS Chat</Link>
                </i>
            </ul>
        </div>
    );
}