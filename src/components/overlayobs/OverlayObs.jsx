import { ChatOverlay } from "../../pages/chat-overlay/Chat-overlay";
import { ViewersCountOverlay } from "../../pages/viewercount-over/ViewersCount-overlay";

export const OverlayObs = () => {
    return (
        <>
            <div> 
                <ChatOverlay/>
                <ViewersCountOverlay/>
            </div>
        </>
    )
}