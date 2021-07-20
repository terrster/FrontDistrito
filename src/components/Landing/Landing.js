import React, { useEffect } from 'react';
import Header from './Header/Header';
import LandSimulator from '../Simulator/LandSimulator';
import AboutUs from './AboutUs/AboutUs';
import Video from './Video/Video';
import HowWorks from './HowWorks/HowWorks';
import Doubts from './Doubts/Doubts';
import Axios from "../../utils/axios";

const Landing = () => {

    useEffect(() => {
        const addVisit = async() => {
            await Axios.post('/counter/visit');
        }

        addVisit();
    }, []);

    return (
        <div className="">
            <Header title={"¿Necesitas financiamiento?"} text={"Recibe las mejores ofertas de crédito "} highlighted={"¡En menos de 24 horas!"} buttonText={"Solicitar ahora"} />
            <LandSimulator />
            <div className="container-fluid">               
                <HowWorks />
                <Video />
                <AboutUs />      
                <Doubts /> 
            </div>
        </div>
    );
}

export default Landing;