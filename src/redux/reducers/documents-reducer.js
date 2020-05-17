import {
    UPDATE_FILES,
    UPDATE_FILES_ARR
} from '../types/documentsTypes';

const initialState = {
    oficialID : [], 
    proofAddress : [], 
    bankStatements : [],  
    constitutiveAct : [], 
    otherActs : [], 
    financialStatements : [], 
    rfc : [] , 
    acomplishOpinion : [], 
    lastDeclarations : [], 
    facturacion: [],
    others : [], 
    cventerprise:[], 
    proofAddressMainFounders:[]
}

const documentsReducer = (state = initialState,action) => {
    var newState = Object.assign({}, state)
    switch (action.type){
        case UPDATE_FILES:
            for (let i = 0; i < action.data.file.length; i++) {
                newState[action.data.key].push(action.data.file[i]) 
            }
            return newState
        case UPDATE_FILES_ARR:
            newState[action.data.key] = action.data.files
            return newState
        default: 
            return state
    }
}
export default documentsReducer 