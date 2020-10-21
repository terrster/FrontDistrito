import React from "react";

const SolicitudBox = ({children, classParams, styleParams}) => {
    return(
        <div className={`estatus-solicitud-box ${classParams}`} style={styleParams}>
            {children}
        </div>
    );
}

export default SolicitudBox;