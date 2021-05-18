import React from 'react';
import Title from '../Generic/Title';
import AlliesForm from '../../forms/AlliesForm';

const Allies = () => {
    const initialValues = {
		nameMainContact: '',
		allieName: '',
        businessName: '',
        leadsEmail1: '',
        leadsEmail2: '',
        leadsEmail3: '',
        logo: [],
        typeCredit: {
            simple: false,
            revolvente: false,
            factoraje: false,
            arrendamiento: false,
            leaseBack: false,
            puente: false
        },
        taxRegime: {
            sinAlta: false,
            RIF: false,
            PFAE: false,
            PM: false
        },
        annualSales: "",
        requestedAmountRange: "",
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
        }
	}

    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <>
            <Title title="Alta de Alianza" className="title-dp fz42 fw500 mb-1 text-center"/> 

            <div className="text-dp pl-5 pr-5">
                Tempor excepteur cupidatat veniam exercitation adipisicing culpa. Ad occaecat duis reprehenderit sint dolore ea ad Lorem esse Lorem ad Lorem laborum. Pariatur irure sunt veniam consectetur velit reprehenderit. Sunt non excepteur nisi cillum. Laboris nostrud anim proident tempor. Fugiat reprehenderit mollit commodo occaecat eiusmod irure Lorem dolor laboris laborum cupidatat occaecat.
            </div>

            <AlliesForm initialValues={initialValues} handleSubmit={handleSubmit}/>
        </>
    );
}

export default Allies;
