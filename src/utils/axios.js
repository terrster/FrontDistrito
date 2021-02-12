import axios from 'axios';

const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND}`,
    headers: {
        token: `${sessionStorage.getItem('token')}`,
        // tokensecret: `D7Mqvg5aPcypn97dxdB/Kfe330wwu0IXx0pFQXIFmjs=`
    }
});

export default Axios;
