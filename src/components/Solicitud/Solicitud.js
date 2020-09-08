import React, {useState, useLayoutEffect} from "react";

import Curso from "./Curso";
import Pendiente from "./Pendiente";
import BuroPendiente from "./BuroPendiente";
import BuroPendienteAnalisando from "./BuroPendienteAnalisando";

const Solicitud = () => {

    const [estatus, setEstatus] = useState(1);
    const [component, setComponent] = useState(null);
    
    const showEstatus = (estatus) => {
        switch(estatus){
            case 1:
                setComponent(<Curso/>)
            break;
            case 2:
                setComponent(<Pendiente/>)
            break;
            case 3:
                setComponent(<BuroPendiente/>)
            break;
            case 4:  
                setComponent(<BuroPendienteAnalisando/>)
            break;
        }
    }

    useLayoutEffect(async() => {
        /*Obtener el estatus de solicitud a través de una ruta conectada a hubspot*/
        await setTimeout(() => {            
            setEstatus(4);
        }, 3000);
        
        /*Mostrar componente*/
        showEstatus(estatus);
    }, []);

    useLayoutEffect(() => {
        showEstatus(estatus);
    }, [estatus]);

    return(
        <div className="container mt-30">
            {component}
            {/* <Curso/>  
            <Pendiente/>  
            <BuroPendiente/>
            <BuroPendienteAnalisando/> */}
        </div>
    );
}

export default Solicitud;