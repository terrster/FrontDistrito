import {
    UPDATE_AMOUNT,
    UPDATE_AMOUNT_SUCCESS,
    UPDATE_AMOUNT_ERROR,
    UPDATE_CONT,
    UPDATE_CONT_SUCCESS,
    UPDATE_CONT_ERROR,
    UPDATE_STEP,
    UPDATE_STEP_SUCCESS,
    UPDATE_STEP_ERROR,
    UPDATE_TERM,
    UPDATE_TERM_SUCCESS,
    UPDATE_TERM_ERROR,
    SET_NEW_SIMULATION,
    SET_NEW_SIMULATION_SUCCESS,
    SET_NEW_SIMULATION_ERROR
} from '../types/simulatorTypes';

export function updateAmount(amount){
    return (dispatch) => {
        dispatch( amountF() );
        try {
            dispatch( amountSuccess(amount))
        } catch (e) {
            dispatch (amountError('Ocurrio un error al actualizar el monto.'))
        }
    }
}

export function updateCont(cont){
    return (dispatch) => {
        dispatch( contF() );
        try {
            dispatch(contSuccess(cont))
        } catch (e) {
            dispatch (contError('Ocurrio un error al actualizar. Intente otra vez'))
        }
    }
}

export function updateStep(step){
    return (dispatch) => {
        dispatch( stepF() );
        try {
            if(step === 2){
                setTimeout(() => {
                    dispatch(stepSuccess(step))
                }, 3000);
            }
            else{
                dispatch(stepSuccess(step))
            }
        } catch (e) {
            dispatch (stepError('Ocurrio un error. Intente otra vez'))
        }
    }
}

export function updateTerm(term){
    return (dispatch) => {
        dispatch( termF() );
        try {
            dispatch(termSuccess(term))
        } catch (e) {
            dispatch (termError('Ocurrio un error. Intente otra vez'))
        }
    }
}

export function newSimulation(){console.log("Nueva simluacion");
    return (dispatch) => {
        dispatch( setNewSimulation() );
        try {
            dispatch(setNewSimulationSuccess())
        } catch (e) {
            dispatch (setNewSimulationError('Ocurrio un error. Intente otra vez'))
        }
    }
}

const amountF = () => ({
    type: UPDATE_AMOUNT,
});

const amountSuccess = amount => ({
    type: UPDATE_AMOUNT_SUCCESS,
    payload: amount
});

const amountError = error => ({
    type: UPDATE_AMOUNT_ERROR,
    payload: error
});

const contF = () => ({
    type: UPDATE_CONT,
});

const contSuccess = cont => ({
    type: UPDATE_CONT_SUCCESS,
    payload: cont
});

const contError = error => ({
    type: UPDATE_CONT_ERROR,
    payload: error
});

const stepF = () => ({
    type: UPDATE_STEP
});

const stepSuccess = step => ({
    type: UPDATE_STEP_SUCCESS,
    payload: step
});

const stepError = error => ({
    type: UPDATE_STEP_ERROR,
    payload: error
});

const termF = () => ({
    type: UPDATE_TERM
});

const termSuccess = term => ({
    type: UPDATE_TERM_SUCCESS,
    payload: term
});

const termError = error => ({
    type: UPDATE_TERM_ERROR,
    payload: error
});

const setNewSimulation = () => ({
    type: SET_NEW_SIMULATION,
});

const setNewSimulationSuccess = () => ({
    type: SET_NEW_SIMULATION_SUCCESS,
});

const setNewSimulationError = () => ({
    type: SET_NEW_SIMULATION_ERROR,
});