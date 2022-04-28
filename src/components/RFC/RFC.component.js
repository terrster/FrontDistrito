import React, { useState } from 'react'
import {Buffer} from 'buffer';
import '../../css/rfc.css'
import logito from '../../assets/img/logo_dp/logodp-01.png'


export const RFCcomponent = () => {

    const toInputUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
    };
    const [RFC, setRFC] = useState("");
    const [CIEC, setCIEC] = useState("");

    const code64 = (RFC, CIEC,e) => {
        e.preventDefault();
        let RFC64 = Buffer.from(RFC).toString('base64');
        let CIEC64 = Buffer.from(CIEC).toString('base64');
        console.log(RFC64);
        console.log(CIEC64);
        return { RFC64, CIEC64 };
    }

  return (
        <div className='text-center outer'>   
            <div className="login-form">
                <form>
                    <img className="mb-4 img-fluid" src={logito} alt='LogoPyme' ></img>
                    <div className="m-2">
                        <input type="text" className="form-control" id="RFC" maxLength={13} value={RFC} onChange={e => setRFC(e.target.value)}
                        onInput={toInputUppercase} placeholder='RFC de la empresa o negocio' />
                    </div>
                    <div className="m-2">
                        <input type="password" className="form-control" id="CIEC" value={CIEC} onChange={e => setCIEC(e.target.value)} maxLength={8} placeholder='CIEC'/>
                    </div>
                    <p className="mt-1 mb-1 text-muted"><small>Al seleccionar "enviar", usted acepta nuestros <a href='https://distritopyme.com/terminos-y-condiciones'>términos de uso</a> y <a href='https://distritopyme.com/privacidad'>aviso de privacidad.</a></small></p>
                    <button type="submit" className="w-100 btn btn-lg btn-blue-general" onClick={(e) => code64(RFC,CIEC, e)} >enviar</button>
                </form>
            </div>
        </div>
  )
}
