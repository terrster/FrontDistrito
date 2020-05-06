import GraphObject from "./GraphObject";

export default class ComercialInfo extends GraphObject {

    constructor(
        id = null,
        comercialName = null,
        businessName = null,
        gyre = null,
        rfc = null,
        specific = null,
        phone = null,
        webSite = null,
        facebook = null,
        terminal = null,
        warranty = null,
        status = null,
        address = null,
        street = null,
        extNumber = null,
        intNumber = null,
        zipCode = null,
        town = null,
        day = null,
        month = null,
        year = null
    ){
        super();
        this.id = id;
        this.comercialName = comercialName;
        this.businessName = businessName
        this.gyre = gyre;
        this.rfc = rfc;
        this.specific = specific;
        this.phone = phone;
        this.webSite = webSite;
        this.facebook = facebook;
        this.terminal = terminal;
        this.warranty = warranty;
        this.status = status;
        this.address = address;
        this.street = street;
        this.extNumber = extNumber;
        this.intNumber = intNumber;
        this.zipCode = zipCode;
        this.town = town;
        this.day = day;
        this.month = month;
        this.year = year;
    }

}