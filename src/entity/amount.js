import GraphObject from "./GraphObject";

export default class AmountEntity extends GraphObject {

    constructor(
        id = null,
        howMuch = null,
        old = null,
        term = null,
        whyNeed = null,
        yearSales = null
    ){
        super();
        this.id = id;
        this.howMuch = howMuch;
        this.old = old;
        this.term = term;
        this.whyNeed = whyNeed;
        this.yearSales = yearSales
    }

}
