import React from "react";

const SolicitudBox = ({children, styleParams}) => {
    return(
        <div className="estatus-solicitud-box" style={styleParams}>
            {children}
        </div>
    );
}

export default SolicitudBox;