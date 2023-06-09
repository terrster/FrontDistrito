//Imágenes financieras
import ASPIRIA from '../assets/img/alianzas/aspiria.png';
import IMPULSO from '../assets/img/alianzas/impulso.png';
import CREZE from '../assets/img/alianzas/creze.png';
import CUMPLO from '../assets/img/alianzas/cumplo.png';
import BIENPARABIEN from '../assets/img/alianzas/bienparabien.png';
import BANCOPPEL from '../assets/img/alianzas/bancoppel.png';
import CREDIJUSTO from '../assets/img/alianzas/credijusto.png';
import DOCUFORMAS from '../assets/img/alianzas/docuformas.png';
import PRETMEX from '../assets/img/alianzas/pretmex.png';
import UNICLICK from '../assets/img/alianzas/uniclick.png';
import MUNDI from '../assets/img/alianzas/mundi.png';
import FACTOREXPRES from '../assets/img/alianzas/factorexpres.png';
import MICRO from '../assets/img/alianzas/micro.png';
import AVCAPITAL from '../assets/img/alianzas/avcapital.png';
import HayCash from '../assets/img/alianzas/haycash.png';
import Pagaloop from '../assets/img/alianzas/pagaloop.png';
import iBan from '../assets/img/alianzas/iBan.png';
import Lendera from '../assets/img/alianzas/Lendera.png';
import Dimex from '../assets/img/alianzas/dimex.png';
import ION from '../assets/img/alianzas/ion.png';
import Amifin from '../assets/img/alianzas/amifin.png';
import DeltAi from '../assets/img/alianzas/deltAi.png';
import Cualli from '../assets/img/alianzas/cualli.png';
import KUBO from '../assets/img/alianzas/kubo.png';
import Mexarrend from '../assets/img/alianzas/mexarrend.png';
import Albo from '../assets/img/alianzas/albo.png';
import Drip from '../assets/img/alianzas/drip.png';
import Sqn from '../assets/img/alianzas/sqn.png';
import Quant from '../assets/img/alianzas/quant.png';
import Creditas from '../assets/img/alianzas/creditas.png';
import LenMi from '../assets/img/alianzas/lenmi.png';
import Resuelve from '../assets/img/alianzas/resuelve.png';
import SBFinancial from '../assets/img/alianzas/sb.png';
import Clara from '../assets/img/alianzas/clara.png';
import Afirme from '../assets/img/alianzas/afirme.png';
import Banorte from '../assets/img/alianzas/banorte.png';
import Konfio from '../assets/img/alianzas/konfio.png';
import Billpocket from '../assets/img/alianzas/billpocket.png';
import GBM from '../assets/img/alianzas/logogbm.svg';
import Tivos from '../assets/img/alianzas/tivos-01.svg';
import Capitalx from '../assets/img/alianzas/cx.svg';
import Dbmenos from '../assets/img/alianzas/dbmenos.svg';
import Finsus from '../assets/img/alianzas/FINSUS-TEXTO.png';

export const filterFinancials = (financials) => {
    
    const filteredFinancials = financials.split(';').filter((financial) => {
        return financial !== 'Bancoppel' && financial !== 'DOCUFORMAS' && financial !== 'AV CAPITAL' && financial !== 'RESUELVE' && financial !== 'ALBO'; 
    });

    return filteredFinancials;
}

export const imgFinancial = (financial) => {
    switch(financial.toUpperCase()){
        case 'ASPIRIA':
        return ASPIRIA;

        case 'IMPULSO':
        case 'IMPULSOMX AUT':
        case 'IMPULSOMX':
        return IMPULSO;

        case 'CREZE':
        return CREZE;

        case 'CUMPLO':
        return CUMPLO;

        case 'BIEN PARA BIEN':
        return BIENPARABIEN;

        case 'BANCOPPEL':
        return BANCOPPEL;

        case 'CREDIJUSTO':
        return CREDIJUSTO;

        case 'DOCUFORMAS':
        return DOCUFORMAS;

        case 'PRETMEX':
        return PRETMEX;

        case 'UNICLICK':
        return UNICLICK;

        case 'MUNDI':
        return MUNDI;
        
        case 'FACTOR EXPRES':
        return FACTOREXPRES;

        case 'MICRO':
        return MICRO;

        case 'AV CAPITAL':
        return AVCAPITAL;

        case 'HAYCASH':
        return HayCash;

        case 'PAGALOOP':
        return Pagaloop;

        case 'IBAN':
        return iBan;

        case 'PRETMEX (FASTTRACK)':
        return Lendera;

        case 'DIMEX':
        return Dimex;

        case 'ION':
        return ION;
        
        case 'AMIFIN':
        return Amifin;

        case 'DELTAI':
        return DeltAi;

        case 'CUALLI':
        return Cualli;

        case 'KUBO':
        return KUBO;

        case 'MEXARREND':
        return Mexarrend;

        case 'ALBO':
        return Albo;

        case 'DRIP':
        return Drip;

        case 'SQN':
        return Sqn;

        case 'QUANT':
        return Quant;

        case 'CREDITAS HOME':
        return Creditas;

        case 'CREDITAS AUTO':
        return Creditas;

        case 'RESUELVE':
        return Resuelve;

        case 'LENMI':
        return LenMi;

        case 'SB FINANCIAL':
        return SBFinancial;

        case 'CLARA':
        return Clara;

        case 'AFIRME':
        return Afirme;

        case 'BANORTE':
        return Banorte;

        case 'KONFIO':
        return Konfio;

        case 'BILLPOCKET':
        return Billpocket;

        case 'GBM':
        return GBM;

        case 'TIVOS':
        return Tivos;

        case 'CAPITALX':
        return Capitalx;

        case 'DBMENOS':
        return Dbmenos;

        case 'FINSUS':
        return Finsus;


        case 'ALL':
        return [
            ASPIRIA,
            IMPULSO,
            CREZE,
            CUMPLO,
            BIENPARABIEN,
            // BANCOPPEL,
            CREDIJUSTO,
            // DOCUFORMAS,
            PRETMEX,
            UNICLICK,
            // MUNDI,
            FACTOREXPRES,
            // MICRO, //Es un producto dentro de Impulso
            // AVCAPITAL,// Javier lo elimino
            HayCash,
            // Pagaloop,
            iBan,
            Lendera, //PRETMEX (FASTTRACK)
            // Dimex,
            ION,
            Amifin,
            // DeltAi,
            Cualli,
            KUBO,
            Mexarrend,
            // Albo,
            Drip,
            Sqn,
            // Quant,
            Creditas,
            // Resuelve,
            LenMi,
            // SBFinancial,
            Clara,
            Afirme,
            Banorte,
            Konfio,
            Billpocket,
            GBM,
            Tivos,
            Capitalx,
            Dbmenos,
        ];
        case "CARRUSEL": 
        return [
            Finsus,
            HayCash,
            Lendera,
            Billpocket,
        ]

        default:
        return null;

    }
}

export const dataFinancial = (financial, properties) => {//Propuestas
    console.log('properties', properties);
    switch(financial.toUpperCase()){
        case 'ASPIRIA':
            return {
                financiera: 'Aspiria',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '1.2% semanal',
                logo: imgFinancial(financial),
                class: 'ASPIRIA'
            };

        case 'IMPULSO':
        case 'IMPULSOMX AUT':
        case 'IMPULSOMX':
            let tasa = parseFloat(properties.tasa_preaut.value);
            function toFixed(num, fixed) {
                var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
                return num.toString().match(re)[0];
            }
            return {
                financiera: 'ImpulsoMx',
                monto: properties.monto_preaut.value,
                plazo: properties.plazo_preaut.value + ' meses',
                tasa: toFixed(tasa, 1) + '% mensual',
                logo: imgFinancial(financial),
                class: 'IMPULSO'
            };

        case 'CREZE':
            return {
                financiera: 'Creze',
                monto: properties.monto_preaut.value,
                plazo: '18 meses',
                tasa: '2.5% mensual',
                logo: imgFinancial(financial),
                class: 'CREZE'
            };

        case 'CUMPLO':
            return {
                financiera: 'Cumplo',
                monto: properties.monto_preaut.value,
                plazo: 'Disposiciones desde 30 y hasta 120 días',
                tasa: '2.93% mensual sobre el monto utilizado',
                logo: imgFinancial(financial),
                class: 'CUMPLO'
            };

        case 'BIEN PARA BIEN':
            return {
                financiera: 'Bien para Bien',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 60 meses',
                tasa: '2.25% mensual',
                logo: imgFinancial(financial),
                class: 'BIENPARABIEN'
            };

        // case 'BANCOPPEL'://Sin firma de contrato
        //     return {
        //         financiera: 'Bancoppel',
        //         monto: properties.monto_preaut.value,
        //         plazo: '',
        //         tasa: '',
        //         logo: imgFinancial(financial),
        //         class: 'BANCOPPEL'
        //     };

        case 'CREDIJUSTO':
            return {
                financiera: 'Credijusto',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 60 meses',
                tasa: '2.25% mensual',
                logo: imgFinancial(financial),
                class: 'CREDIJUSTO'
            };

        // case 'DOCUFORMAS'://No aplica
        //     return {
        //         financiera: 'Docuformas',
        //         monto: properties.monto_preaut.value,
        //         plazo: '',
        //         tasa: '',
        //         logo: imgFinancial(financial),
        //         class: 'DOCUFORMAS'
        //     };

        case 'PRETMEX':
            return {
                financiera: 'Pretmex',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '2% mensual',
                logo: imgFinancial(financial),
                class: 'PRETMEX'
            };

        case 'UNICLICK':
            return {
                financiera: 'Uniclick',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '2.9% mensual',
                logo: imgFinancial(financial),
                class: 'UNICLICK'
            };

        case 'MUNDI':
            return {
                financiera: 'Mundi',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 120 días por cada disposición',
                tasa: '1.8% mensual',
                logo: imgFinancial(financial),
                class: 'MUNDI'
            };

        case 'FACTOR EXPRES':
            return {
                financiera: 'Factor Expres',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '2% mensual',
                logo: imgFinancial(financial),
                class: 'FACTOREXPRES'
            };

        case 'MICRO':
            return {
                financiera: 'Impulsate',
                monto: properties.monto_preaut.value,
                plazo: '3 meses',
                tasa: '5.74% mensual',
                logo: imgFinancial(financial),
                class: 'MICRO'
            };

        // case 'AV CAPITAL'://Omitir
        //     return {
        //         financiera: 'Av Capital',
        //         monto: properties.monto_preaut.value,
        //         plazo: '',
        //         tasa: '',
        //         logo: imgFinancial(financial),
        //         class: 'AVCAPITAL'
        //     };

        case 'HAYCASH':
            return {
                financiera: 'Hay Cash',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '2.5% mensual',
                logo: imgFinancial(financial),
                class: 'HAYCASH'
            };

        case 'PAGALOOP':
            return {
                financiera: 'Pagaloop',
                monto: properties.monto_preaut.value,
                plazo: '12 meses',
                tasa: '18.5% mensual',
                logo: imgFinancial(financial),
                class: 'PAGALOOP'
            };

        case 'IBAN':
            return {
                financiera: 'iBan',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 120 meses',
                tasa: '2% mensual',
                logo: imgFinancial(financial),
                class: 'IBAN'
            };
        
        case 'PRETMEX (FASTTRACK)':
            return {
                financiera: 'Lendera',
                monto: properties.monto_preaut.value,
                plazo: '24 meses',
                tasa: '2% mensual',
                logo: imgFinancial(financial),
                class: 'LENDERA'
            };

        case 'DIMEX':
            return {
                financiera: 'Neofin',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 120 meses',
                tasa: '2.5% mensual',
                logo: imgFinancial(financial),
                class: 'DIMEX'
            };

        case 'ION':
            return {
                financiera: 'ION',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 144 meses',
                tasa: '1.5% mensual',
                logo: imgFinancial(financial),
                class: 'ION'
            };
        
        case 'AMIFIN':
            return {
                financiera: 'Amifin',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 120 meses',
                tasa: '28% anual',
                logo: imgFinancial(financial),
                class: 'AMIFIN'
            };

        case 'DELTAI':
            return {
                financiera: 'delt.ai',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 45 días',
                tasa: '30% anual',
                logo: imgFinancial(financial),
                class: 'DELTAI'
            };

        case 'CUALLI':
            return {
                financiera: 'Cualli',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 48 meses',
                tasa: '2.4% mensual',
                logo: imgFinancial(financial),
                class: 'CUALLI'
            };

        case 'KUBO':
            return {
                financiera: 'Kubo',
                monto: properties.monto_preaut.value,
                plazo: 'De 4 a 36 meses',
                tasa: '3.75% mensual',
                logo: imgFinancial(financial),
                class: 'KUBO'
            };

        case 'MEXARREND':
            return {
                financiera: 'Mexarrend',
                monto: properties.monto_preaut.value,
                plazo: '36 meses',
                tasa: '31% anual',
                logo: imgFinancial(financial),
                class: 'MEXARREND'
            };

        case 'DRIP':
            return {
                financiera: 'DripCapital',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 120 días por disposición',
                tasa: '1.5% mensual',
                logo: imgFinancial(financial),
                class: 'DRIP'
            };
        case 'QUANT':
            return {
                financiera: 'QuantCapital',
                monto: properties.monto_preaut.value,
                plazo: 'Línea activa de 24 a 30 meses con disposiciones de hasta 120 días',
                tasa: '26% anual',
                logo: imgFinancial(financial),
                class: 'QUANT'
            };
        case 'CREDITAS HOME':
            return {
                financiera: 'Creditas Home',
                monto: properties.monto_preaut.value,
                plazo: 'Hasta 180 meses, comisión por apertura 1%',
                tasa: '22% anual',
                logo: imgFinancial(financial),
                class: 'CREDITAS HOME'
            };
        case 'CREDITAS AUTO':
            return {
                financiera: 'Creditas Auto',
                monto: properties.monto_preaut.value,
                plazo: '60 meses, comisión por apertura 2.7%',
                tasa: '23% anual',
                logo: imgFinancial(financial),
                class: 'CREDITAS AUTO'
            };
        case 'SB FINANCIAL':
            return {
                financiera: 'SB Financial',
                monto: properties.monto_preaut.value,
                plazo: '12, 24, 36 y 48 meses',
                tasa: '27% anual, comisión por apertura 3%',
                logo: imgFinancial(financial),   
                class: 'SB FINANCIAL'
            };
        case 'CLARA':
            return {
                financiera: 'Clara',
                monto: properties.monto_preaut.value,
                plazo: 'Revolvente a pagos mensuales, sin comisión por apertura',
                tasa: '0% mensual',
                logo: imgFinancial(financial),
                class: 'CLARA'
            };
        case 'AFIRME':
            return {
                financiera: 'Afirme',
                monto: properties.monto_preaut.value,
                plazo: 'De 12 a 84 meses, 2% comisión por apertura',
                tasa: '1.4% mensual',
                 logo: imgFinancial(financial),
                 class: 'AFIRME'
             };
         case 'BANORTE':
            return {
                financiera: 'Banorte',
                monto: properties.monto_preaut.value,
                plazo: 'De 3 a 60 meses, 5% comisión por apertura',
                tasa: '2.5% mensual',
                logo: imgFinancial(financial),
                class: 'BANORTE'
            };

        case 'KONFIO':
            return {
                financiera: 'Konfio',
                monto: properties.monto_preaut.value,
                plazo: 'De 3 a 60 meses, 3% comisión por apertura',
                tasa: '2.5 % mensual',
                logo: imgFinancial(financial),
                class: 'KONFIO'
             };

             case 'CAPITAL X':
                return {
                    financiera: 'CAPITAL X',
                    monto: properties.monto_preaut.value,
                    plazo: 'Hasta 12 meses',
                    tasa: '1.5% al 3% mensual',
                    logo: imgFinancial("CAPITALX"),
                    class: 'CAPITALX'
                };
             case 'LENMI':
                return {
                    financiera: 'LENMI',
                    monto: properties.monto_preaut.value,
                    plazo: '6 meses',
                    tasa: '3.0% + IVA',
                    logo: imgFinancial(financial),
                    class: 'LENMI'
                };

    }
}

export const dataFinancialFormalization = (properties) => {
    let financial = properties.otorgante_que_autoriza.value.split(";")[0].replace("Aut", "", "gi").trim();

    switch(financial.toUpperCase()){
        case 'ASPIRIA':
            return {
                financiera: 'Aspiria',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'ASPIRIA'
            };

        case 'IMPULSO':
        case 'IMPULSOMX AUT':
        case 'IMPULSOMX':
            let tasa = parseFloat(properties.n12_2_tasa_autorizada.value);
            function toFixed(num, fixed) {
                var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
                return num.toString().match(re)[0];
            }
            return {
                financiera: 'ImpulsoMx',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: toFixed(tasa, 1) + "% mensual",
                logo: imgFinancial(financial),
                class: 'IMPULSO'
            };

        case 'CREZE':
            return {
                financiera: 'Creze',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'CREZE'
            };

        case 'CUMPLO':
            return {
                financiera: 'Cumplo',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'CUMPLO'
            };

        case 'BIEN PARA BIEN':
            return {
                financiera: 'Bien para Bien',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'BIENPARABIEN'
            };

        // case 'BANCOPPEL'://Sin firma de contrato
        //     return {
        //         financiera: 'Bancoppel',
        //         monto: properties.n12_1_monto_autorizado.value,
        //         plazo: properties.n12_3_plazo_autorizado.value,
        //         tasa: properties.n12_2_tasa_autorizada.value,
        //         logo: imgFinancial(financial),
        //         class: 'BANCOPPEL'
        //     };

        case 'CREDIJUSTO':
            return {
                financiera: 'Credijusto',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'CREDIJUSTO'
            };

        // case 'DOCUFORMAS'://No aplica
        //     return {
        //         financiera: 'Docuformas',
        //         monto: properties.n12_1_monto_autorizado.value,
        //         plazo: properties.n12_3_plazo_autorizado.value,
        //         tasa: properties.n12_2_tasa_autorizada.value,
        //         logo: imgFinancial(financial),
        //         class: 'DOCUFORMAS'
        //     };

        case 'PRETMEX':
            return {
                financiera: 'Pretmex',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'PRETMEX'
            };

        case 'UNICLICK':
            return {
                financiera: 'Uniclick',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value+ "% mensual",
                logo: imgFinancial(financial),
                class: 'UNICLICK'
            };

        case 'MUNDI':
            return {
                financiera: 'Mundi',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'MUNDI'
            };

        case 'FACTOR EXPRES':
            return {
                financiera: 'Factorexpres',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'FACTOREXPRES'
            };

        case 'MICRO':
            return {
                financiera: 'Impulsate',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'MICRO'
            };

        // case 'AV CAPITAL'://Omitir
        //     return {
        //         financiera: 'Av Capital',
        //         monto: properties.n12_1_monto_autorizado.value,
        //         plazo: properties.n12_3_plazo_autorizado.value,
        //         tasa: properties.n12_2_tasa_autorizada.value,
        //         logo: imgFinancial(financial),
        //         class: 'AVCAPITAL'
        //     };

        case 'HAYCASH':
            return {
                financiera: 'Hay Cash',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'HAYCASH'
            };

        case 'PAGALOOP':
            return {
                financiera: 'Pagaloop',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'PAGALOOP'
            };

        case 'IBAN':
            return {
                financiera: 'iBan',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'IBAN'
            };

        case 'PRETMEX (FASTTRACK)':
            return {
                financiera: 'Lendera',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'LENDERA'
            };

        // case 'DIMEX':
        //     return {
        //         financiera: 'Dimex',
        //         monto: properties.n12_1_monto_autorizado.value,
        //         plazo: properties.n12_3_plazo_autorizado.value + " meses",
        //         tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
        //         logo: imgFinancial(financial),
        //         class: 'DIMEX'
        //     };

        case 'ION':
            return {
                financiera: 'ION',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'ION'
            };
        
        case 'AMIFIN':
            return {
                financiera: 'Amifin',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'AMIFIN'
            };

        case 'DELTAI':
            return {
                financiera: 'delt.ai',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'DELTAI'
            };

        case 'CUALLI':
            return {
                financiera: 'Cualli',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'CUALLI'
            };

        case 'KUBO':
            return {
                financiera: 'Kubo',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'KUBO'
            };

        case 'MEXARREND':
            return {
                financiera: 'Mexarrend',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'MEXARREND'
            };

        case 'DRIP':
            return {
                financiera: 'DripCapital',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'DRIP'
            };

        case 'QUANT':
            return {
                financiera: 'QuantCapital',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'QUANT'
            };
        case 'CREDITAS HOME':
             return {
                 financiera: 'Creditas Home',
                 monto: properties.n12_1_monto_autorizado.value,
                 plazo: properties.n12_3_plazo_autorizado.value + " meses",
                 tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                 logo: imgFinancial(financial),
                 class: 'CREDITAS HOME'
             };
         case 'CREDITAS AUTO':
            return {
                 financiera: 'Creditas Auto',
                 monto: properties.n12_1_monto_autorizado.value,
                 plazo: properties.n12_3_plazo_autorizado.value + " meses",
                 tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                 logo: imgFinancial(financial),
                 class: 'CREDITAS AUTO'
            };
        case 'SB FINANCIAL':
            return {
                 financiera: 'SB Financial',
                 monto: properties.n12_1_monto_autorizado.value,
                 plazo: properties.n12_3_plazo_autorizado.value + " meses",
                 tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                 logo: imgFinancial(financial),
                 class: 'SB Financial'
            };

        case 'CLARA':
            return {
                 financiera: 'Clara',
                 monto: properties.n12_1_monto_autorizado.value,
                 plazo: properties.n12_3_plazo_autorizado.value + " meses",
                 tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                 logo: imgFinancial(financial),
                 class: 'CLARA'
            };

        case 'AFIRME':
            return {
                financiera: 'Afirme',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'AFIRME'
            };
        
        case 'BANORTE':
            return {
                financiera: 'Banorte',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'BANORTE'
            };
        case 'KONFIO':
            return {
                financiera: 'Konfio',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'KONFIO'
            };
        case 'CAPITAL X':
            return {
                financiera: 'CAPITAL X',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial("CAPITALX"),
                class: 'CAPITALX'
            };
        case 'LENMI':
            return {
                financiera: 'LENMI',
                monto: properties.n12_1_monto_autorizado.value,
                plazo: properties.n12_3_plazo_autorizado.value + " meses",
                tasa: properties.n12_2_tasa_autorizada.value + "% mensual",
                logo: imgFinancial(financial),
                class: 'LENMI'
            };
    
    }
}