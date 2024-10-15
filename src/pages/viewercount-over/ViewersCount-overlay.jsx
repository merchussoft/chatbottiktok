import './ViewersCountOverlay.scss';

export const ViewersCountOverlay = () => {
    return (
        <>
            <div className="div_viewers_count">
                <h3>Contador de espectadores</h3>
                <div className="overlay_desc">
                Muestra la cantidad actual de espectadores de TikTok. Resulta útil si estás haciendo transmisiones múltiples en Twitch.
                </div>

                <br />

                <div className="widgetViewerCount">
                    <div className="url_viewer"></div>
                </div>

                <div className="viewer_count_option">

                    <div className="div_vista_previa">
                        <h3>Vista Previa</h3>

                        <div className="vista_previa">
                            <img src="https://static.vecteezy.com/system/resources/previews/022/227/329/original/tiktok-logo-icon-free-png.png" height="32" width="32" alt="" className="logo_app" />
                            <h1 className="number_count">100</h1>
                        </div>
                    </div>

                    <div className="div_options_vista">

                        <h3>Personalizar</h3>

                        <div className="div_fondo">
                            <span className="text_fondo">Fondo</span>
                            <input type="color" id="color_fondo" name="color_fondo" value="#ff0000" readOnly/>
                        </div>

                        <div className="div_fondo">
                            <span className="text_fondo">Opacidad</span>
                            <input type="range" id="slider" name="slider" min="0" max="100" value="" step="1" readOnly/>
                        </div>

                        <div className="div_fondo">
                            <span className="text_fondo">Color</span>
                            <input type="color" id="color_font" name="color_font" value="#ff0000" readOnly/>
                        </div>


                        <div className="div_fondo">
                            <span className="text_fondo">Tipografia</span>
                            <select name="select_tipografia" id="select_tipografia" readOnly>
                                <option value="">Seleccionar</option>
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Roboto">Roboto</option>
                            </select>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}