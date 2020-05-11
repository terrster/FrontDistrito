import React, { useState } from 'react';
/* import { Mutation } from 'react-apollo';
import Mutations from '../../utils/Mutations'; */
import { connect } from 'react-redux';

// Components
import { Col, Row } from 'react-bootstrap';
import TypeCard from '../Generic/TypeCard';

// Images
import pf from '../../assets/img/persona-f-sica@2x.png';
import pfae from '../../assets/img/persona-f-sica-cn-actividad-empresarial@2x.png';
import pm from '../../assets/img/persona-moral@2x.png';
import rif from '../../assets/img/rif@2x.png';

// Refs
const pfRef = React.createRef();
const pfaeRef = React.createRef();
const rifRef = React.createRef();
const pmRef = React.createRef();

const PersonType = (props) => {

  const [personType, setPersonType] = useState(sessionStorage.type);

	const updateClient = async (data, UpdateClient) => {
		let { value } = data.target;
		try {
			let updatedClient = await UpdateClient({
				variables: {
					type: value
				}
			});
      sessionStorage.setItem('type', updatedClient.data.updateClient.type);
      setPersonType(sessionStorage.type);
			this.props.history.push('/credito');
		} catch (err) {}
  };

  const pfDisabledClass = isDisabledType(personType,"PF");
  const rifDisabledClass = isDisabledType(personType,"RIF");
  const pfaeDisabledClass = isDisabledType(personType,"PFAE");
  const pmDisabledClass = isDisabledType(personType,"PM");

	return (
		/* <Mutation mutation={Mutations.UPDATE_CLIENT}> */
			<div>
                {(UpdateClient) => (
                    <Row>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Negocios sin alta en el SAT"
                                class={`firstBlue fw500 brandonReg ` + pfDisabledClass}
                                img={pf}
                                updateUser={e => updateClient(e, UpdateClient)}
                                value="PF"
                                refs={pfRef}
                            />
                        </Col>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Régimen de incorporación fiscal"
                                class={`secondBlue fw500 brandonReg ` + rifDisabledClass}
                                updateUser={e => updateClient(e, UpdateClient)}
                                img={rif}
                                value="RIF"
                                refs={rifRef}
                            />
                        </Col>
                        <Col sm={12} lg={3} md={6}>
                            <TypeCard
                                text="Persona física con actividad empresarial"
                                class={`thirdBlue fw500 brandonReg ` + pfaeDisabledClass}
                                updateUser={e => updateClient(e, UpdateClient)}
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
                                updateUser={e => updateClient(e, UpdateClient)}
                                refs={pmRef}
                            />
                        </Col>
                    </Row>
			    )}
            </div>
		/* </Mutation> */
	);
};

// Devuelve un string con la clase card-disabled si  no coincide con el tipo de persona de la tarjeta
const isDisabledType = (currentPersonType, personType) => {
  return currentPersonType === personType ? "" : "card-disabled";
};  

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user.user,
		history: ownProps.history
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateUser: user => {
			dispatch({ type: 'UPDATE_USER', data: { user } });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonType);
