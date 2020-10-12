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

export const filterFinancials = (financials) => {
    let financialsfilt = [];

    financials.split(';').forEach(financial => {
        if(financial !== 'CREZE' && financial !== 'Bancoppel' && financial !== 'DOCUFORMAS' && financial !== 'AV CAPITAL'){
            financialsfilt.push(financial);
        }
    });

    return financialsfilt;
}

export const imgFinancial = (financial) => {
    switch(financial.toUpperCase()){
        case 'ASPIRIA':
        return ASPIRIA;

        case 'IMPULSO':
        case 'IMPULSOMX AUT':
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
    }
}

export const dataFinancial = (financial, properties) => {
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
            let tasa = parseFloat(properties.tasa_preaut.value);
            function toFixed(num, fixed) {
                var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
                return num.toString().match(re)[0];
            }
            return {
                financiera: 'ImpulsoMx',
                monto: properties.monto_preaut.value,
                plazo: properties.plazo_preaut.value + ' meses',
                tasa: toFixed(tasa, 1) + '% anual',
                logo: imgFinancial(financial),
                class: 'IMPULSO'
            };

        // case 'CREZE'://Ya no
        //     return {
        //         financiera: 'Creze',
        //         monto: properties.monto_preaut.value,
        //         plazo: '',
        //         tasa: '',
        //         logo: imgFinancial(financial),
        //         class: 'CREZE'
        //     };

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
                financiera: 'Factorexpres',
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
                plazo: '',
                tasa: '',
                logo: imgFinancial(financial),
                class: 'PAGALOOP'
            };

        case 'IBAN':
            return {
                financiera: 'iBan',
                monto: properties.monto_preaut.value,
                plazo: '',
                tasa: '',
                logo: imgFinancial(financial),
                class: 'IBAN'
            };
    }
}