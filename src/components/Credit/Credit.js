import Title from '../Generic/Title';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import CustomLoader from '../Generic/CustomLoader';
/* import Queries from '../../utils/Queries' 
import Mutations from '../../utils/Mutations';
import { Query, compose, graphql } from 'react-apollo'; */

class Credit extends Component {

	constructor(props){
		super(props)
		if(this.props.user){
			if(this.props.user.idClient.type != null){
				sessionStorage.setItem('type', this.props.user.idClient.type )
			}
		}
 	}

	apply = () => {
		this.props.newEmptyAppliance({
			variables: {
				idClient : this.props.user.idClient.id
			}
		})
			.then( data => {
				let newAppliance = data.data.createEmptyAppliance
				this.props.updateAppliance(newAppliance)
				this.props.history.push(`/credito/solicitud/${newAppliance.id}`)
				sessionStorage.setItem('applianceId',newAppliance.id)
			})
			.catch( err => console.log(JSON.stringify(err)))
	}

	getAppliances = (idClient) => (
        /* <Query query={Queries.QUERY_APPLIANCE} variables={{clientId : idClient}}> */
        <div>
			 {({loading,err,data, refetch}) => {
				if (loading)
				if (err){
					window.location.reload();
					return 'Error del servicio, intenta de nuevo';
				}
				this.props.updateLoader(true)
				if(data !== null && data !== undefined && data.myAppliances !== undefined && data.myAppliances.length > 0 ){
					this.props.updateLoader(false)
					this.props.history.push(`/credito/solicitud/${data.myAppliances[0].id}`)
					return ''
				} else {
						this.props.updateLoader(false)
						return (
							<div className="text-center mt-120">
								<Title title="Aún no tienes una solicitud con nosotros" />
								<Button className="btn-blue-general mt-50" onClick={this.apply}> SOLICITAR </Button>
							</div>
						)
				}
            }}
        </div>    
		/* </Query> */
	)

	render() { 
		let id = (sessionStorage.getItem('applianceId') !==  undefined) ? sessionStorage.getItem('applianceId') :this.props.match.params.idAppliance;
		let type = sessionStorage.getItem('type');
		return ( 
			<div className="mt-72 mb-120 container">
				{
					(!id && this.props.user)
					?
					<div>
						<Title className="blackBlue coolvetica fw500 fz32 mb-16" title={`Hola ` +sessionStorage.getItem('nameUser')} />
						<label className="brandonReg gray50 fz20 fw500">Conoce el detalle de tu solicitud</label>
						{(type !== null && typeof type === 'string' && type !== 'null') ? this.getAppliances(this.props.user.idClient.id) :window.location.href = `/home`}
					</div>
					: 
					<div className="text-center brandonReg fz32" style={{marginTop : '200px', marginBottom : '200px'}}>
						{
							(id !== undefined && id !== null && type !== null && typeof type == 'string'  && type !== 'null') 
							? this.props.history.push(`/credito/solicitud/`+id) : window.location.href = `/home`}
						Regresa a <i>"Mi cuenta"</i> para que podamos cargar todas las solicitudes de tu perfil.
						
					</div>
				}
			</div>
		 );
	}
}

/* const mapStateToProps = (state, ownProps) => {
	return {
		user : state.user.user,
		appliance : state.appliance.appliance
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
		}
	}
} */
 
/* Credit = compose(
	graphql(Mutations.NEW_APPLIANCE, { name : "newEmptyAppliance"})
)(Credit) */
 
export default /* connect(mapStateToProps, mapDispatchToProps)( */Credit/* ) */;
