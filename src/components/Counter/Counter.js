import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Axios from "../../utils/axios";
import CustomLoader from '../Generic/CustomLoader';

const Counter = () => {
    const [counter, setCounter] = useState({
        visits: 0,
        simulations: 0
    });
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCounter = async() => {
            let {data} = await Axios.get('/counter');
            setCounter(data.counter);
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }

        getCounter();
    }, []);

    return(
        <Container>
            {
				isLoading &&
                <CustomLoader />
			}
            { 
                !isLoading &&
                <Table striped bordered size="sm">
                    <thead className="text-center">
                        <tr>
                            <th>Visitas a la página</th>
                            <th>Simulaciones realizadas</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td>{counter.visits}</td>
                            <td>{counter.simulations}</td>
                        </tr>       
                    </tbody>
                </Table>
            }   
        </Container>
    );
}

export default Counter;