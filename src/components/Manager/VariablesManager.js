class VariablesManager {


	createSignupVariables = (data) => {
		let {name, lastname, email, password, phone} = data
		return {
			name,
			lastname,
			email,
			password,
			phone,
			access : "USER"
		}
	}

	createAmountVariables = (data) => {
		let { howMuch, whyNeed, whenNeed, yearSales, old, term  } = data
		return {
			howMuch : parseInt(howMuch),
			whyNeed,
			whenNeed,
			yearSales : parseInt(yearSales),
			old,
			term : parseInt(term),
			status: (howMuch && whyNeed && whenNeed && yearSales && old && term) ? true : false
		}
	}

	createComercialInfoVariables = (data, address) => {
		let { comercialName, businessName, gyre, rfc, specific, phone, webSite, facebook, terminal, warranty } = data
		return {
			comercialName,
			businessName,
			gyre,
			rfc,
			specific,
			phone,
			webSite,
			facebook,
			terminal : (terminal === 1 || terminal === '1') ? true : false,
			warranty: (warranty === 1 || warranty === '1') ? true : false,
			address,
			status : (comercialName && gyre && rfc && specific && phone) ? true : false
		}

	}


	createGeneralInfoVariables = (data) => {
		let { name, lastname, secondLastname, civilStatus, rfcPerson, day, month, year, ciec, phone, carCredit, mortgageCredit, creditCard, last4 } = data

		return {
			name,
			lastname,
			secondLastname,
			civilStatus,
			rfcPerson,
			last4: (last4) ? last4 : null,
			birthDate : new Date(`${day}/${month}/${year}`).toLocaleDateString(),
			ciec: (ciec) ? ciec : null,
			phone,
			carCredit : carCredit,
			mortgageCredit : (mortgageCredit === "1") ? true : false,
			creditCard: (creditCard === "1") ? true : false,
			status: true
		}
	}

	createAddressVariables = (data) => {
		let { street, extNumber, intNumber, zipCode, town, phone } = data
		return {
			street,
			extNumber,
			intNumber,
			town,
			phone,
			zipCode
		}
	}

	createReferenceVariables = (data) => {
		let {name1, phone1, relative1, name2, phone2, relative2, name3, phone3, relative3 } = data
		return [
			{
				name : name1,
				phone : phone1,
				relative : relative1
			},
			{
				name : name2,
				phone : phone2,
				relative : relative2
			},
			{
				name : name3,
				phone : phone3,
				relative : relative3
			}
		]
	}

	createDocumentsVariables = (data) => {
		let variables = {
			oficialID : data[0],
			proofAddress : data[1],
			bankStatements : data[2],
			constitutiveAct : data[3],
			otherActs : data[4],
			financialStatements : data[5],
			rfc : data[6],
			lastDeclarations: data[8],
			acomplishOpinion: data[7],
			facturacion: data[9],
			others : data[10],
			cventerprise: data[11],
			proofAddressMainFounders: data[12],

		}
		let ans = {
			oficialID : [],
			proofAddress : [],
			bankStatements : [],
			constitutiveAct : [],
			otherActs : [],
			financialStatements : [],
			rfc : [],
			acomplishOpinion:[],
			lastDeclarations:[],
			facturacion:[],
			others:[],
			cventerprise:[],
			proofAddressMainFounders:[]

		}
		Object.keys(variables).map( (key, index) => 
			variables[key].map( (value, index) => {
				if(typeof value == 'string'){
					ans[key].push(value)
				}else{
					ans[key].push(value.data.data)
				}
			}
			)
		)

		return ans
	}

}

export default VariablesManager

export const variablesManager = new VariablesManager()