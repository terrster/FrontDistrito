/* import gql from 'graphql-tag';

const QUERY_APPLIANCE = gql`
	query getAppliances($clientId: String!) {
		myAppliances(clientId: $clientId) {
			id
			status
			reason
			idAmount {
				howMuch
				term
				registerDate
				whyNeed
				idClient {
					appliance {
						id
					}
				}
			}
			idGeneralInfo {
				id
				name
			}
			idComercialInfo {
				comercialName
				businessName
				gyre
				specific
				rfc
			}
			idDocuments {
				oficialID
				proofAddress
				bankStatements
				others
			}
		}
	}
`;

const QUERY_APPLIANCE2 = gql`
	query getAppliances($clientId: String!) {
		myAppliances(clientId: $clientId) {
			status
			reason
			idAmount {
				howMuch
				term
				registerDate
				whyNeed
				idClient {
					appliance {
						id
					}
				}
			}
			idGeneralInfo {
				id
				name
				phone
			}
			idComercialInfo {
				comercialName
				businessName
				gyre
				specific
				rfc
			}
			idDocuments {
				oficialID
				proofAddress
				bankStatements
				others
			}
		}
	}
`;

const GET_APPLIANCE = gql`
	query getOneAppliance($applianceId: String!) {
		getAppliance(applianceId: $applianceId) {
			id
			status
			reason
			tips
			proposals {
				id
				file
				fileName
			}
			idAmount {
				id
				howMuch
				whyNeed
				term
				yearSales
				old
				status
			}
			idDocuments {
				id
				oficialID
				proofAddress
				bankStatements
				others
				constitutiveAct
				otherActs
				financialStatements
				rfc
				status
				lastDeclarations
				acomplishOpinion
				cventerprise
				proofAddressMainFounders
				status
			}
			idGeneralInfo {
				id
				civilStatus
				rfcPerson
				name
				secondLastname
				lastname
				birthDate
				address {
					street
					extNumber
					zipCode
					town
					intNumber
					town
				}
				contactWith {
					id
					name
					phone
					relative
				}
				mortgageCredit
				carCredit
				creditCard
				last4
				ciec
				phone
			}
			idComercialInfo {
				id
				comercialName
				businessName
				gyre
				rfc
				specific
				phone
				address {
					id
					street
					extNumber
					zipCode
					town
					intNumber
				}
				webSite
				facebook
				status
				terminal
				warranty
			}
			idClient {
				id
				idUser {
					id
					name
				}
			}
		}
	}
`;

const QUERY_ME = gql`
	query myInfo {
		myProfile {
			id
			name
			lastname
			email
			phone
			idClient {
				appliance {
					id
					status
				}
				id
				type
				idDocuments {
					oficialID
					proofAddress
					bankStatements
					others
				}
				idComercialInfo {
					comercialName
					businessName
					gyre
					specific
					rfc
				}
				idGeneralInfo {
					id
					name
					secondLastname
					lastname
					birthDate
					phone
				}
			}
		}
	}
`;

const QUERY_USER_EMAIL = gql`
	query user($email: String) {
		userByEmail(email: $email) {
			id
		}
	}
`;

const QUERY_CREDITS = gql`
	query clientCredits($idClient: String!) {
		clientCredits(idClient: $idClient) {
			id
			amount
			reason
			term
			expiresDate
			date
		}
	}
`;

let Queries = {
	QUERY_APPLIANCE,
	QUERY_APPLIANCE2,
	QUERY_ME,
	GET_APPLIANCE,
	QUERY_USER_EMAIL,
	QUERY_CREDITS
};

export default Queries;
 */