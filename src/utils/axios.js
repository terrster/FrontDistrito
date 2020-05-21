import axios from 'axios';

const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND}`,
    headers: {
        token: `${sessionStorage.getItem('token')}`
    }
});

export default Axios;
