import { useState } from 'react';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import './sidebar.scss'

export const Sidebar = () => {

    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(prevShow => !prevShow);


    return (
        <>
            {/* Boton de menu para moviles */}
            <Button 
                variant="primary" 
                onClick={handleToggle} 
                className="position-fixed top-0 end-0 d-md-none m-3"
                style={{
                    zIndex: 1050,
                    width: "50px",      // Ancho fijo
                    height: "50px",     // Alto fijo
                    padding: 0,         // Elimina el padding extra
                    borderRadius: "50%", // Hace el botón redondo si quieres
                }}
            >
                ☰
            </Button>

            {/* Sidebar Offcanvas */}
            <Offcanvas show={show} onHide={handleToggle} placement="start" responsive="md" className="bg-dark text-white" style={{height: '100vh', width: "250px"}}>
                <Offcanvas.Header closeButton className="d-md-none">
                <Offcanvas.Title>Tiktokbot</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Link href="/" className="text-white">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link href="/overlayobs" className="text-white">
                        Overlay Obs
                    </Nav.Link>
                    <Nav.Link href="#" className="text-white">
                        TTS Chat
                    </Nav.Link>
                </Nav>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}