import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Generic/Title";
import "../../css/account.css";
import ApplianceCard from "../Generic/ApplianceCard";
import CustomLoader from "../Generic/CustomLoader";
import comercialOptions from "../../models/ComercialInfoModels";
import { Row, Col } from "react-bootstrap";
import titoAccount from "../../assets/img/tito-account.png";
import axios from '../../utils/axios';

const Home = (props) => {
  // Redux state
  const {
    loader: { isLoading },
  } = useSelector((state) => state);

  // Estado de prueba, mientras se realiza el endpoint
  const [myProfile, setMyProfile] = useState({
    idClient: {
      type: "idClient-type",
      idComercialInfo: {
        comercialName: "",
        gyre: "",
        specific: "",
        rfc: "",
      },
      idDocuments: null,
    },
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [newApplianceID, setNewApplianceID] = useState("idAppliance");

  useEffect(() => {
    const getData = async () => {
		const currentUser = JSON.parse(sessionStorage.getItem("user"));
		const userRequest = await axios.get('api/user/info', {
			headers: {
				token: sessionStorage.getItem("token")
			}
		});
		const comercialInfoRequest = await axios.get('api/info/comercial', {
			headers: {
				token: sessionStorage.getItem("token")
			}
		});
		const documentsInfoRequest = await axios.get('api/documents', {
			headers: {
				token: sessionStorage.getItem("token")
			}
		});
		console.log(documentsInfoRequest);
		const user = userRequest.data.user;
		const idClient = userRequest.data.user.idClient[0]
		const comercialInfo = comercialInfoRequest.data.info;
		const newProfile = {
			...myProfile,
			email: user.email,
			name: user.name,
			lastName: user.lastName,
			phone: user.phone,
			idClient: {
				type: "idClient-type",
				idComercialInfo: {
					comercialName: comercialInfo.comercialName,
					gyre: comercialInfo.gyre,
					specific: comercialInfo.specific,
					rfc: comercialInfo.rfc,
				},
				idDocuments: null,
			},
		};
		setMyProfile(newProfile);
    };

    getData();
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


  return (
    <div className="container mt-72 mb-120">
      {isLoading && <CustomLoader />}
      <div>
        <Title
          className="blackBlue coolvetica fw500 fz32 mb-16"
          title={`Hola ` + user.name}
        />
        {/* info */}
      </div>
      <Row className="d-flex justify-content-center">
        <Col lg={6} md={6} sm={12}>
          <ApplianceCard
            keyData={"generalData"}
            first={myProfile.idClient.type}
            second={`${user.name} ${user.lastName}`}
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
              second={myProfile.idClient.idComercialInfo.gyre}
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
