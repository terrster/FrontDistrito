import React, { Component } from "react";
import Title from "../Generic/Title";
import { connect } from "react-redux";
import CustomLoader from "../Generic/CustomLoader";
import TableGeneral from "../Generic/TableGeneral";
import TableComercial from "../Generic/TableComercial";
import TableAmount from "../Generic/TableAmount";
import TableDocuments from "../Generic/TableDocuments";
import DropdownRow from "../Generic/DropdownRow";

const RejectedAppliance = (props) => {
	const data = {
		getAppliance: {
			tips: "tips",
			idGeneralInfo: 'idGeneralInfo',
			idComercialInfo: 'idComercialInfo',
			idAmount: 'idAmount',
			idDocuments: 'idDocuments'
		}
	}
  const getInfo = () => {
    let appliance = data.getAppliance;
    return (
      <div>
        <div className="mt-50 mb-50 text-left">
          <Title title="Lo sentimos" className="coolvetica fz48 blackBlue" />
          <div className="brandonLight fz20" style={{ maxWidth: "800px" }}>
            Desafortunadamente tu solicitud de crédito ha sido rechazada.
            <br />
            Sabemos que no es una buena noticia, pero no te preocupes, puedes
            mandarnos un WHATSAPP al 55-2695-4055 ó llamarnos al 55-8661-9486 y
            uno de nuestros asesores financieros te podrá dar recomendaciones
            para mejorar las condiciones de tu empresa o negocio y así poder
            calificar para alguna de nuestras opciones de crédito en el futuro.
            <br />
            Gracias por confiar en nosotros.
          </div>
        </div>
        <Title
          title="Solicitud rechazada"
          className="coolvetica fz32 blackBlue"
        />
        <div className="recomendation-box mt-50 mb-50">
          <Title title="Recomendaciones" className="coolvetica fz24" />
          <div className="text-center mt-3 brandonLight fz18">
            {appliance.tips}
          </div>
        </div>
        <DropdownRow
          component={<TableGeneral props={appliance.idGeneralInfo} />}
          title="Datos generales"
          name="general"
        />
        <DropdownRow
          name="comercial"
          title="Datos comerciales"
          component={<TableComercial props={appliance.idComercialInfo} />}
        />
        <DropdownRow
          name="amount"
          title="Datos de préstamo"
          component={<TableAmount props={appliance.idAmount} />}
        />
        <DropdownRow
          name="documents"
          title="Documentos"
          component={<TableDocuments props={appliance.idDocuments} />}
        />
      </div>
    );
  };

  return <div className="container">{getInfo()}</div>;
};
/* 
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    dropdowns: state.app.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch({ type: "UPDATE_USER", data: { user } });
    },
    updateDropdown: (key) => {
      dispatch({ type: "UPDATE_DROPDOWN", data: { key } });
    },
  };
}; */

export default RejectedAppliance;
