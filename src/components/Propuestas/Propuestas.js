import React, { useState, useLayoutEffect, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "../../utils/axios";
import { imgFinancial } from '../../utils/imgFinancials';

const Propuestas = () => {
    //const user = JSON.parse(sessionStorage.getItem("user"));
    const user = {
        _id: '5ec8365e67de6c3fd0d807c7',
        hubspotDealId: '2951617913'
    }

    const [properties, setProperties] = useState(null);
    const [proposals, setProposals] = useState(null);

    useLayoutEffect( () => {
        const getHubspotProperties = async() => {
            try{
                let {data} = await Axios.get(`/api/deal/${user.hubspotDealId}`);
                setProperties(data.properties);
            } 
            catch(error){
                //console.log(error);
                //showEstatus(null);
            }
        }

        //setTimeout(() => {
            getHubspotProperties();
        //}, 2000);
    }, []);

    useEffect( () => {
        if(properties != null){
            if(properties.hasOwnProperty('financiera_banco_que_analiza')){
                setProposals(properties.financiera_banco_que_analiza.value.split(';'));
            }
        }
    }, [properties]);


    return (
        <div className="container">
            <Row>
                <Col sm={12}>
                    <div className="title-dp fz42 mb-18 fw500">
                        Propuestas
                    </div>
                    <Row>
                        {
                            proposals != null &&
                            proposals.map((proposal, i) => {
                                return <Col key={i} lg={3} md={6} xs={6}>
                                            <div className="text-center">
                                                <img src={imgFinancial(proposal)} alt={proposal} className={`imgAlianza ${proposal}`} />
                                            </div>
                                        </Col>
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Propuestas;