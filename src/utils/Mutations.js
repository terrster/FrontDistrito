/* import gql from 'graphql-tag'

const CREATE_USER = gql`
	mutation Signup($name: String!, $lastname: String!, $email: String!, $phone: String!,$password: String!, $access: USERTYPE!){
		signup(
			signupInput : {
				name : $name
				lastname : $lastname
				email : $email
				phone : $phone
				password : $password
				access : $access
			}
		){
			user{
				id
				email
			}
			token
		}
	}
`

const RESET_PASSWORD = gql`
	mutation ResetPassword($email: String!){
		resetPassword(
			email: $email
		){
			status
		}
	}
`

const RECOVER_PASSWORD = gql`
	mutation CreatePassword($hash: String!, $password: String!){
		createPassword(
			hash: $hash,
			password: $password
		){
			status
		}
	}
`

const CREATE_CLIENT = gql `
	mutation NewClient( $type: TYPES, $subType: SUBTYPES, $sign: String, $score: String ){
		createClient(
			type: $type
			subType : $subType
			sign: $sign,
			score: $score
		){
			id
			type
			score
			subType
			sign
			registerDate
			idUser {
				name
				lastname
			}
		}
	}
`

const CREATE_AMOUNT = gql `
	mutation NewAmount( $howMuch: Int !, $whyNeed: WHYNEED !, $whenNeed: WHENNEED!, $term: Int!, $yearSales: Int !, $old: ANTIQUITY!, $status: Boolean !){
		createAmount(
			amountInput : {
			howMuch: $howMuch
			whyNeed: $whyNeed
			whenNeed: $whenNeed
			term: $term
			yearSales: $yearSales
			old: $old
			status: $status
			}
		){
			id
			idClient{
				type
				subType
				score
				registerDate
			}
			howMuch
			whyNeed
			whenNeed
			term
			yearSales
			old
			registerDate
		}
	}
`

const CREATE_COMERCIAL = gql `
	mutation newComercialInfo( $comercialName: String!, $businessName: String $gyre: GYRE!, $rfc: String!, $specific: String!, $phone: String!, $webSite: String, $facebook: String, $terminal: Boolean, $warranty: Boolean, $status: Boolean!, $address: String! ){
		createComercialInfo(
			comercialInfoInput : {
				comercialName : $comercialName
				gyre: $gyre
				businessName: $businessName
				rfc: $rfc
				specific: $specific
				phone: $phone
				webSite: $webSite
				facebook: $facebook
				terminal: $terminal
				warranty: $warranty
				status: $status
				address: $address
			}
		){
			id
			comercialName
			businessName
			rfc
			gyre
			specific
			phone
			webSite
			facebook
			warranty
			address{
				street
				zipCode
			}
			idClient{
				type
				subType
				score
				registerDate
			}
			registerDate
		}
	}
`

const CREATE_ADDRESS = gql`
	mutation newAddress( $street: String!, $extNumber: String!, $intNumber: String, $zipCode: String!, $town:String! ){
		createAddress(
			addressInput: {
				street: $street
				extNumber: $extNumber
				intNumber: $intNumber
				zipCode: $zipCode
				town: $town
			}
		){
			id
			street
			extNumber
			intNumber
			zipCode
			town
			registerDate
			idUser{
				name
				lastname
			}
		}
	}
`

const CREATE_REF = gql `
	mutation newReference( $name: String!, $phone: String!, $relative:REFTYPE!){
		createReference(
			referenceInput : {
				name: $name
				phone: $phone
				relative: $relative
			}
		){
			id
		}
	}
`

const CREATE_GENERAL_INFO = gql `
	mutation newGeneralInfo( $civilStatus:CIVIL!, $rfcPerson: String, $name: String!, $secondLastname:String!, $lastname:String!, $address:String!, $mortgageCredit:Boolean!, $creditCard:Boolean!, $carCredit:CARCRED!, $status: Boolean!, $references:[String!]!, $birthDate: String!, $last4: String, $ciec: String,$phone: String){
		createGeneralInfo(
			generalInfoInput:{
				name: $name
				lastname: $lastname
				secondLastname: $secondLastname
				address : $address
				mortgageCredit: $mortgageCredit
				creditCard: $creditCard
				carCredit: $carCredit
				status : $status
				references : $references
				civilStatus : $civilStatus
				rfcPerson: $rfcPerson
				birthDate: $birthDate
				last4: $last4
				ciec: $ciec
				phone: $phone
			}
		){
			id
			civilStatus
			rfcPerson
			name
			lastname
			secondLastname
			civilStatus
			rfcPerson
			birthDate
			address{
				id
				street
				town
				extNumber
				intNumber
				zipCode
			}
			idClient{
				type
				subType
				score
				registerDate
			}
			contactWith{
				id
				name
				phone
				relative
			}
			mortgageCredit
			carCredit
			creditCard
			registerDate
			last4
			ciec
			phone
		}
	}
`

const NEW_APPLIANCE = gql `
	mutation NewAppliance{
		createEmptyAppliance{
			id
			idClient{
				id
				type
				subType
				score
				registerDate
			}
		}
	}
`

const UPDATE_APPLIANCE = gql `
	mutation updateAppliance($idAmount: String, $idDocuments: String, $idGeneralInfo: String, $idComercialInfo: String, $idAppliance: String!, $status: Boolean){
		updateAppliance(
			applianceInput : {
				idAmount: $idAmount
				idDocuments: $idDocuments
				idGeneralInfo: $idGeneralInfo
				idComercialInfo: $idComercialInfo
				idAppliance : $idAppliance
				status : $status
			}
		){
			status
			idClient{
				type
				subType
				score
				registerDate
			}
			idDocuments{
				oficialID
				proofAddress
				bankStatements
				others
				constitutiveAct
				otherActs
				financialStatements
				rfc
			}
			idAmount{
				howMuch
				whyNeed
				whenNeed
				term
				yearSales
				old
			}
			idGeneralInfo{
				civilStatus
				rfcPerson
				name
				secondLastname
				lastname
				address{
					street
					extNumber
					intNumber
					zipCode
				}
				mortgageCredit
				carCredit
				creditCard
				ciec
				phone
			}
			idComercialInfo{
				comercialName
				businessName
				gyre
				rfc
				specific
				phone
				address{
					street
					extNumber
				}
				webSite
				facebook
				warranty
			}
		}
	}
`

const CREATE_APPLIANCE = gql`
	mutation NewAppliance( $idDocuments: String, $idAmount: String, $idGeneralInfo: String, $idComercialInfo: String ){
		createAppliance(
			applianceInput : {
				idDocuments: $idDocuments
				idAmount: $idAmount
				idComercialInfo: $idComercialInfo
				idGeneralInfo: $idGeneralInfo
			}
		){
			id
			idClient{
				type
				subType
				score
				registerDate
			}
			idDocuments{
				oficialID
				proofAddress
				bankStatements
				others
				constitutiveAct
				otherActs
				financialStatements
				rfc
			}
			idAmount{
				howMuch
				whyNeed
				whenNeed
				term
				yearSales
				old
			}
			idGeneralInfo{
				civilStatus
				rfcPerson
				name
				secondLastname
				lastname
				address{
					street
					extNumber
				}
				mortgageCredit
				carCredit
				creditCard
				phone
			}
			idComercialInfo{
				comercialName
				businessName
				gyre
				rfc
				specific
				phone
				address{
					street
					extNumber
					city
					state
				}
				webSite
				facebook
				warranty
			}
		}
	}
`

const CREATE_DOCUMENTS = gql`
	mutation createDocuments($oficialID:[String], $proofAddress:[String], $bankStatements:[String], $others:[String], $constitutiveAct:[String], $otherActs:[String], $financialStatements:[String], $rfc:[String], $lastDeclarations: [String], $acomplishOpinion:[String], $facturacion:[String], $cventerprise:[String], $proofAddressMainFounders:[String], $status: Boolean){
		createDocuments(
			documentInput : {
				oficialID: $oficialID
				proofAddress: $proofAddress
				bankStatements: $bankStatements
				others: $others
				constitutiveAct: $constitutiveAct
				otherActs: $otherActs
				financialStatements: $financialStatements
				rfc: $rfc
				facturacion: $facturacion
				lastDeclarations: $lastDeclarations
				acomplishOpinion: $acomplishOpinion
				cventerprise: $cventerprise
				proofAddressMainFounders: $proofAddressMainFounders
				status: $status
			}
		){
			id
			oficialID
			proofAddress
			bankStatements
			others
			constitutiveAct
			otherActs
			financialStatements
			rfc
			

		}
	}
`

const UPDATE_CLIENT = gql `
	mutation updateClient(
		$type: TYPES!
	){
		updateClient(
			type: $type
		){
			type
		}
	}
`

const UPDATE_CLIENT_DATA = gql`
	mutation updateClient(
		$idDocuments: String, $idComercialInfo: String, $idGeneralInfo: String
	){
		updateClient(
			idDocuments: $idDocuments
			idComercialInfo: $idComercialInfo
			idGeneralInfo: $idGeneralInfo
		){
			id
			idDocuments{
				id
			}
			idGeneralInfo{
				id
			}
			idComercialInfo{
				id
			}
		}
	}
`

const UPDATE_DOCUMENTS = gql`
	mutation updateDocuments($documentId: String!, $oficialID:[String], $proofAddress:[String], $bankStatements:[String], $others:[String], $constitutiveAct:[String], $otherActs:[String], $financialStatements:[String], $rfc:[String], $lastDeclarations: [String], $acomplishOpinion:[String], $facturacion:[String], $cventerprise:[String], $proofAddressMainFounders:[String], $status: Boolean!){
		updateDocuments(
			updateDocument:{
				documentId: $documentId
				oficialID: $oficialID
				proofAddress: $proofAddress
				bankStatements: $bankStatements
				others: $others
				constitutiveAct: $constitutiveAct
				otherActs: $otherActs
				financialStatements: $financialStatements
				rfc: $rfc
				facturacion: $facturacion
				lastDeclarations: $lastDeclarations
				acomplishOpinion: $acomplishOpinion
				cventerprise: $cventerprise
				proofAddressMainFounders: $proofAddressMainFounders
				status: $status
			}
		){
			id
			oficialID
			proofAddress
			bankStatements
			others
			constitutiveAct
			otherActs
			financialStatements
			rfc
		}
	}
`

const UPDATE_AMOUNT = gql `
	mutation updateAmount( $amountId: String!, $howMuch: Int !, $whyNeed: WHYNEED !, $whenNeed: WHENNEED!, $term: Int!, $yearSales: Int !, $old: ANTIQUITY!){
		updateAmount(
			updateAmount: {
				amountId: $amountId
				howMuch: $howMuch
				whyNeed: $whyNeed
				whenNeed: $whenNeed
				term: $term
				yearSales: $yearSales
				old: $old
			}
		){
			id
			idClient{
				type
				subType
				score
				registerDate
			}
			howMuch
			whyNeed
			whenNeed
			term
			yearSales
			old
			registerDate
		}
	}
`

const UPDATE_COMERCIAL = gql `
	mutation updateComercialInfo($comercialId: String!, $comercialName: String!, $businessName: String, $gyre: GYRE!, $rfc: String!, $specific: String!, $phone: String!, $webSite: String, $facebook: String, $address: String!, $terminal: Boolean, $warranty: Boolean){
		updateComercialInfo(
			updateComercial : {
				comercialId: $comercialId
				comercialName : $comercialName
				businessName: $businessName
				gyre: $gyre
				rfc: $rfc
				specific: $specific
				phone: $phone
				webSite: $webSite
				facebook: $facebook
				address: $address
				terminal: $terminal
				warranty: $warranty
			}
		){
			id
			comercialName
			businessName
			rfc
			gyre
			specific
			phone
			webSite
			facebook
			terminal
			warranty
		}
	}
`

const UPDATE_GENERAL_INFO = gql `
	mutation updateGeneralInfo($generalId: String!, $rfcPerson: String, $civilStatus:CIVIL!, $name: String!, $secondLastname:String!, $lastname:String!, $address:String!, $mortgageCredit:Boolean!, $creditCard:Boolean!, $carCredit:CARCRED!, $references:[String!]!, $birthDate: String!, ,$last4: String, $ciec: String, $phone: String,){
		updateGeneralInfo(
			updateGeneral:{
				generalId: $generalId
				name: $name
				lastname: $lastname
				secondLastname: $secondLastname
				address : $address
				mortgageCredit: $mortgageCredit
				creditCard: $creditCard
				carCredit: $carCredit
				references : $references
				civilStatus : $civilStatus
				rfcPerson: $rfcPerson
				birthDate: $birthDate
				last4: $last4
				ciec: $ciec
				phone: $phone
			}
		){
			id
			name
			lastname
			secondLastname
			civilStatus
			rfcPerson
			birthDate
			address{
				id
				street
				town
				extNumber
				intNumber
				zipCode
			}
			idClient{
				type
				subType
				score
				registerDate
			}
			contactWith{
				id
				name
				phone
				relative
			}
			mortgageCredit
			carCredit
			creditCard
			registerDate
			last4
			ciec
			phone
		}
	}
`


const SEND_EMAIL_CONTACT = gql `
	mutation SendEmail($from: String!, $to: String!, $message: String!, $subject: String!){
		sendEmail(
			from: $from,
			to: $to,
			message: $message,
			subject: $subject
		){
			status
		}
	}
`



let Mutations = {
	CREATE_USER,
	CREATE_CLIENT,
	CREATE_AMOUNT,
	CREATE_APPLIANCE,
	CREATE_COMERCIAL,
	CREATE_ADDRESS,
	CREATE_REF,
	CREATE_GENERAL_INFO,
	NEW_APPLIANCE,
	UPDATE_APPLIANCE,
	CREATE_DOCUMENTS,
	UPDATE_CLIENT,
	UPDATE_CLIENT_DATA,
	UPDATE_DOCUMENTS,
	UPDATE_AMOUNT,
	UPDATE_COMERCIAL,
	UPDATE_GENERAL_INFO,
	RESET_PASSWORD,
	RECOVER_PASSWORD,
	SEND_EMAIL_CONTACT
}

export default Mutations */