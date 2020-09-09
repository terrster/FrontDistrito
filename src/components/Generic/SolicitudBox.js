import React from "react";

const SolicitudBox = ({docs}) => {
    return(
        <div className="estatus-solicitud-box">
            <div className="text-dp p-1 fz12">
                DOCUMENTOS PENDIENTES
                <br></br>

                {
                    docs.map((doc, i) => {
                        return <span key={i}>{(i+1) +'.- '+ docs[i]} <br></br> </span>
                    })
                }
            </div>
        </div>
    );
}

export default SolicitudBox;