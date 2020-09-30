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
//import MICRO from '../assets/img/alianzas/micro.png';
import AVCAPITAL from '../assets/img/alianzas/avcapital.png';
import HayCash from '../assets/img/alianzas/haycash.png';

export const imgFinancial = (financial) => {
    switch(financial.replace(" ", "")){
        case 'ASPIRIA':
        return ASPIRIA;

        case 'IMPULSO':
        return IMPULSO;

        case 'CREZE':
        return CREZE;

        case 'CUMPLO':
        return CUMPLO;

        case 'BIENPARABIEN':
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
        
        case 'FACTOREXPRES':
        return FACTOREXPRES;

        case 'MICRO':
        return '';

        case 'AVCAPITAL':
        return AVCAPITAL;

        case 'HayCash':
        return HayCash;
    }
}