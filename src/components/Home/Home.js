import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Title from "../Generic/Title";
import "../../css/account.css";
import ApplianceCard from "../Generic/ApplianceCard";
import CustomLoader from '../Generic/CustomLoader';
import comercialOptions from "../../models/ComercialInfoModels";
import { Row, Col } from "react-bootstrap";
import titoAccount from "../../assets/img/POSES TITO-14-01.png";
import axios from '../../utils/axios';
import { updateLoader } from '../../redux/actions/loaderActions';


const Home = (props) => {
  const history = useHistory();
  // Redux state
  const {
    loader: { isLoading },
  } = useSelector((state) => state);
	const dispatch = useDispatch();
  const userd = JSON.parse(sessionStorage.getItem("user"));
  // Estado de prueba, mientras se realiza el endpoint
  const [myProfile, setMyProfile] = useState({
    idClient: {
      type: "",
      idComercialInfo: {
        comercialName: "",
        gyre: "",
        specific: "",
        rfc: "",
      },
      idDocuments: null,
    },
    name: userd.name,
    lastname: userd.lastName,
    email: userd.email,
    phone: userd.phone,
  });
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [newApplianceID, setNewApplianceID] = useState( user._id );
  
  useLayoutEffect(() => {
	dispatch (updateLoader(true));
    const getData = () => {
		const idUser = user._id;
    const idClient = user.idClient;

    if(user.idClient.appliance.length > 0){
      if(!user.idClient.appliance[0].hasOwnProperty("idGeneralInfo") && !user.idClient.appliance[0].hasOwnProperty("idComercialInfo") && !user.idClient.appliance[0].hasOwnProperty("idDocuments")){
        history.push("/credito/");
      }
    }
    else{
      history.push("/credito/");
    }

		const type = idClient.hasOwnProperty("type") ? idClient.type : "";
		let newProfile = {
			...myProfile,
			idClient: {
				type,
				idComercialInfo: {
					comercialName: "",
					gyre: "",
					specific: "",
					rfc: "",
				},
				idDocuments: null,
			},
		};
		if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				let idDocuments = null
				if (appliance.hasOwnProperty("idDocuments")){
					idDocuments = appliance.idDocuments;
				}
				if (appliance.hasOwnProperty("idComercialInfo")){
					const idComercialInfo = appliance.idComercialInfo;
					const info = {} 
					info.comercialName  = idComercialInfo.hasOwnProperty("comercialName") ? idComercialInfo.comercialName : "";
					info.gyre  = idComercialInfo.hasOwnProperty("gyre") ? idComercialInfo.gyre : "";
					info.specific  = idComercialInfo.hasOwnProperty("specific") ? idComercialInfo.specific : "";
					info.rfc  = idComercialInfo.hasOwnProperty("rfc") ? idComercialInfo.rfc : "";
					newProfile = {
						...myProfile,
						idClient: {
							type,
							idComercialInfo: {
								comercialName: info.comercialName,
								gyre: info.gyre,
								specific: info.specific,
								rfc: info.rfc,
							},
							idDocuments
						},
					}
				}
		};
		setMyProfile(newProfile);
    };

    getData();
    setTimeout(() => {
		 dispatch (updateLoader(false));
	}, 2000)
  }, []);

  const uploadedReady = (arr) => {
    return arr ? "Subido" : "Sin subir";
  };

  const apply = () => {
    this.props
      .newEmptyAppliance({
        variables: {
          idClient: this.props.user.idClient.id,
        },
      })
      .then((data) => {
        let newAppliance = data.data.createEmptyAppliance;
        this.props.updateAppliance(newAppliance);
        this.props.history.push(`/solicitud/${newAppliance.id}`);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  if (isLoading)
		return <CustomLoader />

  return (
    <div className="container mt-72 mb-120">
      <div>
        <Title
          className="title-dp fw500 fz32 mb-16"
          title={`Hola ` + user.name}
        />
        {/* info */}
      </div>
      <Row className="d-flex justify-content-center">
        <Col lg={6} md={6} sm={12}>
          <ApplianceCard
            keyData={"generalData"}
            first={myProfile.idClient.type}
            second={`${user.name} ${user.lastname}`}
            third={myProfile.email}
            fourth={myProfile.phone}
            applianceId={newApplianceID}
          />
        </Col>
        <Col lg={6} md={6} sm={12}>
          {myProfile.idClient.idComercialInfo !== null && (
            <ApplianceCard
              keyData={"comercialInfo"}
              first={myProfile.idClient.idComercialInfo.comercialName}
              second={comercialOptions.hasOwnProperty(myProfile.idClient.idComercialInfo.gyre) ? comercialOptions[myProfile.idClient.idComercialInfo.gyre].name : ""}
              third={myProfile.idClient.idComercialInfo.specific}
              fourth={myProfile.idClient.idComercialInfo.rfc}
              applianceId={newApplianceID}
            />
          )}
          {myProfile.idClient.idComercialInfo === null && (
            <ApplianceCard
              keyData={"comercialInfo"}
              applianceId={newApplianceID}
            />
          )}
        </Col>
        <Col lg={6} sm={12} md={12}>
          {myProfile.idClient.idDocuments !== null && (
            <ApplianceCard
              keyData={"documents"}
              first={uploadedReady(myProfile.idClient.idDocuments.oficialID[0])}
              second={uploadedReady(
                myProfile.idClient.idDocuments.proofAddress[0]
              )}
              third={uploadedReady(
                myProfile.idClient.idDocuments.bankStatements[0]
              )}
              fourth={uploadedReady(myProfile.idClient.idDocuments.others[0])}
              applianceId={newApplianceID}
              
            />
          )}
          {!myProfile.idClient.idDocuments && (
            <ApplianceCard keyData={"documents"} applianceId={newApplianceID} />
          )}
        </Col>
        <Col lg={6} className="text-center mt-2 mt-md-0">
          <img
            src={titoAccount}
            className="account-tito-card"
            alt="personaje de la empresa"
          />
        </Col>
      </Row>
    </div>
  );
};
/*
const mapStateToProps = (state, ownProps) => {
	return {
		user : state.user.user,
		appliance : state.appliance.appliance,
		history: ownProps.history
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateLoader : (isLoading) => {
			dispatch({type : "UPDATE_LOADER", data : {isLoading}})
		},
		updateUserName : (name) => {
			dispatch({ type : "UPDATE_NAME", data : {name}})
		},
		updateUser : (user) => {
			dispatch({ type : "UPDATE_USER", data : {user}})
		},
		updateAppliance : (appliance) => {
			dispatch({ type : "UPDATE_APPLIANCE", data : {appliance}})
		},
		updateCurrentUrl : (section) => {
			dispatch({ type : "UPDATE_CURRENT_SECTION", data : {section}})
		}
	}
}

Home = compose(
	graphql(Mutations.NEW_APPLIANCE, { name : "newEmptyAppliance"})
)(Home)
*/

export default Home;
