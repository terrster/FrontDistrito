import React, { useEffect, useState } from 'react';
import Title from '../Generic/Title';
import AlliesForm from '../../forms/AlliesForm';
import { Carousel, ProgressBar, Alert, Button } from 'react-bootstrap';
import AlianzaBanner from '../../assets/img/alianzas/form/alianza_web.webp';
import AlianzaMobil from '../../assets/img/alianzas/form/alianza_mobil.webp';
import registerImage from '../../assets/img/alianzas/form/chava01.webp';
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import axios from '../../utils/axios';
import { useHistory } from 'react-router-dom';

const getSize = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const Allies = () => {

    const img = [AlianzaBanner, AlianzaMobil];

    const [version, setVersion] = useState(getSize());
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('resize', () => setVersion(getSize()));
        return () => {
            window.removeEventListener('resize', () => setVersion(getSize()));
        }
    }  , []);
    
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
        averageRate: "",
        deadline: "",
        openingExpenses: "",
        antiquity: "",
        flexibilityCreditBureau: "",
        score: "",
        geographicLocationsRejected: "",
        ciec: "",
        warranty: "",
        // acceptedLeverage: "",
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

    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({
        show: false,
        msg: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async(values) => {
        try{
            dispatch(updateLoader(true));
            
            let formData = new FormData();
            Object.keys(values).map((f) => {
                if(f !== 'logo' && f !== 'leadEmail' && f !== 'typeCredit' && f !== 'taxRegime' && f !== 'useOfCredit'){
                    formData.append(f, values[f]);
                }
                else if(f === 'leadEmail' || f === 'typeCredit' || f === 'taxRegime' || f === 'useOfCredit'){
                    formData.append(f, JSON.stringify(values[f]));
                }
                else{
                    values[f].map((lf) => {
                        formData.append(f, lf);
                    })
                }
            });
            let {data} = await axios.post('allie', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                }	
            });

            dispatch(updateLoader(false));

            if(data.code === 200){
                window.scrollTo(0, 0);
                setSuccess(true);
            }
            else{
                setUploadPercentage(0);
                setError({
                    show: true,
                    msg: data.msg
                });
                setTimeout(() => {
                    setError({
                        show: false,
                        msg: ''
                    });
                }, 5000);
            }
        }
        catch(error){
            setError({
                show: true,
                msg: 'Algo salió mal tratando de dar de alta la alianza'
            });
            setTimeout(() => {
                setError({
                    show: false,
                    msg: ''
                });
            }, 5000);
        }
    }

    return (
        <>
            <Loader />
            {
                !success &&
                <>
                    <div className="container-fluid alianza_div">
                        <img src={img[version]} alt="alianza" width='1970' height='648' className="alianza-banner" />
                    </div>

                    <Title title="Alta de Alianza" className="title-dp fz42 fw500 mb-1 text-center"/> 

                    <AlliesForm initialValues={initialValues} handleSubmit={handleSubmit}/>
                </>
            }

            {
                uploadPercentage > 0 && !success &&
                <div className="text-center pl-5 pr-5 pb-5">
                    <hr className="divider"/>
                    <p className="text-dp">Creando alianza...</p>
                    <p className="text-dp">{uploadPercentage}%</p>
                    <ProgressBar animated now={uploadPercentage}/>
                </div>
            }

            {
                success &&
                <div className="container mt-30 registro-exitoso">
                    <img src={registerImage} alt="registerimage" className='registerimageali' width='500' height='500'/>
                    <div class="title-dp_clamp mb-18 fw500 text-center"><span style={{color:'#F24C5A'}}>¡estamos</span>  listos para compartirte los mejores expedientes!</div>
                    <p className="text-dp text-center">gracias por confiar en distrito pyme. <br/>la #ComunidadDeCrédito más grande de México</p>
                    <div>
                        <Button className={"btn-blue-documents mb-5 pl-5 pr-5"} style={{ width: '100%', maxWidth:'350px' }} onClick={() => history.push("/")}>regresar al inicio</Button>
                    </div>
                </div>
            }

            {
                error.show &&
                <div className="pl-5 pr-5 pb-5">
                    <Alert variant="danger">
                        <strong>{error.msg}</strong>
                    </Alert>
                </div>
            }
        </>
    );
}

export default Allies;
