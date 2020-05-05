import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Generic/Title";
import "../../css/account.css";
import ApplianceCard from "../Generic/ApplianceCard";
import CustomLoader from "../Generic/CustomLoader";
import comercialOptions from "../../models/ComercialInfoModels";
import { Row, Col } from "react-bootstrap";
import titoAccount from "../../assets/img/tito-account.png";

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
        comercialName: "comercialName",
        gyre: "COMERCE",
        specific: "Specific",
        rfc: "RFC",
      },
      idDocuments: null,
    },
    name: "name",
    lastname: "lastname",
    email: "email",
    phone: "phone",
  });

  const [newApplianceID, setNewApplianceID] = useState("idAppliance");

  useEffect(() => {
    const getData = async () => {
      // Realizar peticion al back
      /* 
            let myProfile = data.myProfile
            this.props.updateUser(myProfile)
            sessionStorage.setItem('type', myProfile.idClient.type)
            sessionStorage.setItem('idClient', myProfile.idClient.id);
            //el indice 0 indica que es la primera apliance
            let applianceId = null
            if (myProfile.idClient &&
                    myProfile.idClient.appliance &&
                        myProfile.idClient.appliance[0])
            {
                applianceId = myProfile.idClient.appliance[0].id
                console.log("1",myProfile.idClient.appliance[0].status)
                if (myProfile.idClient.appliance[0].status === true) {
                    sessionStorage.setItem('status', myProfile.idClient.appliance[0].status);
                    console.log("2", myProfile.idClient.appliance[0].status)
                }
            } 

            let newApplianceID = applianceId */
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
          title={`Hola ` + sessionStorage.getItem("nameUser")}
        />
        {/* info */}
      </div>
      <Row className="d-flex justify-content-center">
        <Col lg={6} md={6} sm={12}>
          <ApplianceCard
            keyData={"generalData"}
            first={myProfile.idClient.type}
            second={`${myProfile.name} ${myProfile.lastname}`}
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
              second={
                comercialOptions[myProfile.idClient.idComercialInfo.gyre].name
              }
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
      {/*  {
                (loading && <CustomLoader />)
                ||
                (err && 'Error del servicio, intenta de nuevo')
                ||
                (data && 
                    <>
                    <Row className="d-flex justify-content-center">
                        <Col lg={6} md={6} sm={12}> 
                            <ApplianceCard 
                                keyData={'generalData'} 
                                first={myProfile.idClient.type} 
                                second={`${myProfile.name} ${myProfile.lastname}`}
                                third={myProfile.email}
                                fourth={myProfile.phone} 
                                applianceId={newApplianceID}
                            />
                        </Col>
                            <Col lg={6} md={6} sm={12}>
                                { myProfile.idClient.idComercialInfo !== null && 
                                    <ApplianceCard 
                                        keyData={'comercialInfo'} 
                                        first={myProfile.idClient.idComercialInfo.comercialName} 
                                        second={comercialOptions[myProfile.idClient.idComercialInfo.gyre].name}
                                        third={myProfile.idClient.idComercialInfo.specific}
                                        fourth={myProfile.idClient.idComercialInfo.rfc} 
                                        applianceId={newApplianceID}
                                    />
                                }
                                { myProfile.idClient.idComercialInfo === null && 
                                    <ApplianceCard 
                                        keyData={'comercialInfo'} 
                                        applianceId={newApplianceID}
                                    />
                                }
                        
                                </Col>
                                <Col lg={6} sm={12} md={12}>
                                { myProfile.idClient.idDocuments !== null && 
                                    <ApplianceCard 
                                    keyData={'documents'} 
                                    first={this.uploadedReady(myProfile.idClient.idDocuments.oficialID[0])} 
                                    second={this.uploadedReady(myProfile.idClient.idDocuments.proofAddress[0])}
                                    third={this.uploadedReady(myProfile.idClient.idDocuments.bankStatements[0])}
                                    fourth={this.uploadedReady(myProfile.idClient.idDocuments.others[0])} 
                                    applianceId={newApplianceID}
                                    />
                                }
                                {
                                    !myProfile.idClient.idDocuments && 
                                    <ApplianceCard 
                                    keyData={'documents'} 
                                    applianceId={newApplianceID}
                                    />
                                }
                                </Col>
                                <Col lg={6} className="text-center mt-2 mt-md-0">
                                    <img src={titoAccount} className="account-tito-card"/>
                                </Col>
                            </Row>
                            </>
                        )
                        if (data.myProfile.idClient.type !== null) {
                            
                            return (
                                <div>
                                    <Title className="blackBlue coolvetica fw500 fz32 mb-16" title={`Hola `+sessionStorage.getItem('nameUser')} />
                                    {info}
                                </div>
                            )
                        } else {
                            return (<SelectType history={this.props.history} />)
                        } 
            }		 */}
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
