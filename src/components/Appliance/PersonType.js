import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';

// Components
import { Col, Row } from 'react-bootstrap';
import TypeCard from '../Generic/TypeCard';

// Images
import pf from '../../assets/img/persona-f-sica@2x.png';
import pfae from '../../assets/img/persona-f-sica-cn-actividad-empresarial@2x.png';
import pm from '../../assets/img/persona-moral@2x.png';
import rif from '../../assets/img/rif@2x.png';

import { updateLoader } from '../../redux/actions/loaderActions';

// Refs
const pfRef = React.createRef();
const pfaeRef = React.createRef();
const rifRef = React.createRef();
const pmRef = React.createRef();

const PersonType = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user"))); 	
  const [personType, setPersonType] = useState("");
	
  const updateClient = async (type) => {
		dispatch( updateLoader(true) );
		const idUser = user._id;
		const myUser = user;
		if (myUser.idClient.length > 0){
			const idClient = myUser.idClient[myUser.idClient.length - 1];
			const updateClient = await axios.put(`api/client/${idClient._id}`, { type }, {
				headers: {
					token: sessionStorage.getItem("token")
				}
			});
			props.onSelectPerson(type);
			const newClient = await axios.get(`api/client/${idClient._id}`, {
				headers: {
					token: sessionStorage.getItem("token")
				}
			});
			
			sessionStorage.setItem('user', JSON.stringify(updateClient.data.user));
			setPersonType(newClient.data.client.type);	
		}
		dispatch( updateLoader(false) );
  };

	useEffect(() => {
		dispatch( updateLoader(true) );
		const getPersonType = async () => {
			const idClient = user.idClient[user.idClient.length - 1]._id
			const res = await axios.get(`api/client/${idClient}`, {
				headers: {
					token: sessionStorage.getItem("token")
				}
			})
			setPersonType(res.data.client.type);	
			//dispatch( updateLoader(false) );
		}
		getPersonType();
	}, []);	

  const pfDisabledClass = isDisabledType(personType,"PF");
  const rifDisabledClass = isDisabledType(personType,"RIF");
  const pfaeDisabledClass = isDisabledType(personType,"PFAE");
  const pmDisabledClass = isDisabledType(personType,"PM");

	return (		
			<div>				
				<Row>
					<Col sm={12} lg={3} md={6}>
						<TypeCard
							text="Negocios sin alta en el SAT"
							class={`firstBlue fw500 brandonReg ` + pfDisabledClass}
							img={pf}
							updateUser={() => updateClient("PF")}
							value="PF"
							refs={pfRef}
						/>
                        </Col>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Régimen de incorporación fiscal"
                                class={`secondBlue fw500 brandonReg ` + rifDisabledClass}
                                updateUser={() => updateClient("RIF")}
                                img={rif}
                                value="RIF"
                                refs={rifRef}
                            />
                        </Col>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Persona física con actividad empresarial"
                                class={`thirdBlue fw500 brandonReg ` + pfaeDisabledClass}
                                updateUser={() => updateClient("PFAE")}
                                img={pfae}
                                value="PFAE"
                                refs={pfaeRef}
                            />
                        </Col>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Persona moral"
                                class={`fourthBlue fw500 brandonReg ` + pmDisabledClass}
                                img={pm}
                                value="PM"
                                updateUser={() => updateClient("PM")}
                                refs={pmRef}
                            />
                        </Col>
                    </Row>
            </div>
	);
};

// Devuelve un string con la clase card-disabled si  no coincide con el tipo de persona de la tarjeta
const isDisabledType = (currentPersonType, personType) => {
  return currentPersonType === personType ? "" : "card-disabled";
};  

export default PersonType;
