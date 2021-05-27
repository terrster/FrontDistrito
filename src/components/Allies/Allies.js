import React from 'react';
import Title from '../Generic/Title';
import AlliesForm from '../../forms/AlliesForm';
import { Carousel } from 'react-bootstrap';
import AlianzaBanner from '../../assets/img/alianzas/form/alianzas_banner.jpg';
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import axios from '../../utils/axios';

const Allies = () => {
    const dispatch = useDispatch();

    const initialValues = {
		nameMainContact: '',
		allieName: '',
        businessName: '',
        leadEmail: {
            primary: '',
            secondary: '',
            tertiary: '',
        },
        typeCredit: {
            simple: false,
            revolvente: false,
            factoraje: false,
            arrendamiento: false,
            leaseBack: false,
            puente: false,
            otro: false,
            otroTxt: ''
        },
        taxRegime: {
            sinAlta: false,
            RIF: false,
            PFAE: false,
            PM: false
        },
        annualSales: "",
        since: "",
        until: "",
        sales: "",
        antiquity: "",
        flexibilityCreditBureau: "",
        score: "",
        geographicLocationsRejected: "",
        ciec: "",
        warranty: "",
        acceptedLeverage: "",
        useOfCredit: {
            expansion: false,
            nuevosProyectos: false,
            comprarMercancia: false,
            pagosAdministrativos: false,
            remodelacion: false,
            consolidarDeudas: false,
            compraEquipo: false,
            otros: false
        },
        logo: []
	}

    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <>
            <Loader />
            <Carousel id="alianza-carousel" className="mb-2" controls={false} indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100"  src={AlianzaBanner} alt="alianzaBanner"/>
                </Carousel.Item>
            </Carousel>

            <Title title="Alta de Alianza" className="subtitle-dp fz42 fw500 mb-1 text-center"/> 

            <AlliesForm initialValues={initialValues} handleSubmit={handleSubmit}/>
        </>
    );
}

export default Allies;
