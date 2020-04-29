import React, {Component} from 'react';

class backendService extends Component{

    // state = {
    //     status: null,
    //     response : []
    // };

    storeDeal = (data) => {
        fetch('url', 
            {
                method: 'post',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            //console.log(response);
            // this.setState({
            //     status : 'success',
            //     response : response
            // });
            return response;
        })
        .catch((error) => {
            console.log('Hubo un problema al registrarse: ' + error.message);
        });
    }

    getDeal = (dealID) => {        
        fetch('url/' + dealID, 
            {
                method: 'get'
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            //console.log(response);
            // this.setState({
            //     status : 'success',
            //     response : response
            // });
            return response;
        })
        .catch((error) => {
            console.log('Hubo un problema al obtener los datos: ' + error.message);
        });
    }

    updateDeal = (data) => {
        fetch('url', 
            {
                method: 'put',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            //console.log(response);
            // this.setState({
            //     status : 'success',
            //     response : response
            // });
            return response;
        })
        .catch((error) => {
            console.log('Hubo un problema al actualizar los datos: ' + error.message);
        });
    }

    deleteDeal = (dealID) => {
        fetch('url/' + dealID, 
            {
                method: 'delete'
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            //console.log(response);
            // this.setState({
            //     status : 'success',
            //     response : response
            // });
            return response;
        })
        .catch((error) => {
            console.log('Hubo un problema al eliminar los datos: ' + error.message);
        });
    }
}

export default backendService;