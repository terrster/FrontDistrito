import { UPADATE_BURO, UPDATE_BURO_SCORE, UPDATE_BURO_MORAL, UPDATE_BURO_MORAL_SCORE } from "../types/buroTypes";

const initialState = {
    buro: false,
    score: null,
    BuroMoral: false,
    BuroMoralScore: null,
}


const buroReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPADATE_BURO:
            return {
                ...state,
                buro: action.payload.buro
            }
        case UPDATE_BURO_SCORE:
            return {
                ...state,
                score: action.payload.score
            }
        case UPDATE_BURO_MORAL:
            return {
                ...state,
                BuroMoral: action.payload.BuroMoral
            }
        case UPDATE_BURO_MORAL_SCORE:
            return {
                ...state,
                BuroMoralScore: action.payload.BuroMoralScore
            }
        default:
            return state
    }
}

export default buroReducer;