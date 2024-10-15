import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { Sidebar } from './components/sidebar/Sidebar'
import { Dashboard } from './components/dashboard/Dashboard'
import { OverlayObs } from './components/overlayobs/OverlayObs'
import { TtsChat } from './components/tts_chat/TtsChat'
import { ChatLine } from './page-url/chat-line/Chat-line'
import { Chat } from './page-url/chat/chat'

import './App.scss'

function App() {

  return (
    <Router>
      
          <Routes>

            <Route path="/chat" exact={true} element={ <Chat />}/>
            <Route path="/chatline" exact={true} element={ <ChatLine />}/>

            <Route 
              path="*" 
              exact={true} 
              element={
                  <div className="flex">
                    <Sidebar/>
                    <div className="content">
                      <Routes>
                        <Route path="/" exact={true} element={ <Dashboard />}/>
                        <Route path="/overlayobs" exact={true} element={ <OverlayObs />}/>
                        <Route path="/tts" exact={true} element={ <TtsChat />}/>
                      </Routes>
                    </div>
                  </div>
              }/>
            
          </Routes>
    </Router>
  )
}

export default App
