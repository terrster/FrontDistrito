import GraphObject from "./GraphObject";

export default class GeneralInfoEntity extends GraphObject {

    constructor(
        id = null,
        name = null,
        lastname = null,
        secondLastname = null,
        civilStatus = "",
        rfcPerson = "",
        day = "",
        month = "",
        year = "",
        sameAddres = false,
        street = null,
        extNumber = null,
        intNumber = null,
        zipCode = null,
        town = null,
        name1= null,
        phone1 = null,
        relative1= "",
        name2= null,
        phone2 = null,
        relative2= "",
        name3= null,
        phone3 = null,
        relative3= "",
        mortgageCredit = "",
        carCredit = "",
        creditCard = "",
        last4 = "",
        tyc = false,
        ciec = null,
        phone = null,

    ){
        super();
        this.id = id;
        this.name = name;
        this.lastname = lastname;   
        this.secondLastname = secondLastname;
        this.civiStatus = civilStatus;
        this.rfcPerson = rfcPerson
        this.day = day;
        this.month = month;        
        this.year = year;
        this.sameAddres = sameAddres;
        this.street = street;
        this.extNumber = extNumber;
        this.intNumber = intNumber;
        this.zipCode = zipCode;
        this.town = town;
        this.name1= name1;
        this.phone1 = phone1;
        this.relative1= relative1;
        this.name2= name2;
        this.phone2 = phone2;
        this.relative2= relative2;
        this.name3 = name3;
        this.phone3 = phone3;
        this.relative3 = relative3;
        this.mortgageCredit = mortgageCredit;
        this.carCredit = carCredit;
        this.creditCard = creditCard;
        this.last4 = last4;
        this.tyc = tyc;
        this.ciec = ciec;
        this.phone = phone;
    }

}