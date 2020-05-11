export default class GraphObject {

    constructor(){ }

    /**
     * Update the current object data with the data of a GraphQL object recibed.
     * @param graphObject 
     * @return An object with the data updated
     */
    fromGraphQlObject(graphObject) {
        for(let key in graphObject)    
            this[key] = graphObject[key];
        return this;
    }

}
