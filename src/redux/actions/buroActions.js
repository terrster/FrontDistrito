import { UPADATE_BURO , UPDATE_BURO_SCORE, UPDATE_BURO_MORAL, UPDATE_BURO_MORAL_SCORE} from "../types/buroTypes";

export function buroPrueba(){
    return (dispatch) => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let buroData = user.idClient.appliance[0].idBuro ? user.idClient.appliance[0].idBuro : false;

                if(user){
                    let { idClient } = user;
                    let buro = null;
                    let score = idClient.score ? idClient.score : false;
                    let type = idClient.type ? idClient.type : null;
                    let buroMoral = type !== 'PM' ? false : buroData === false ? false : buroData.moralStatus;

                    if(score){
                        let error = score.split(' ')[0];
                        if(error === 'ERROR'){
                            buro = 'ERROR';
                        }else{
                            buro = true
                        }
                    }else{
                        buro = false;

                    }

                    dispatch( updateBuro(buro) );
                    dispatch( updateBuroScore(score) );
                    dispatch( updateBuroMoral(buroMoral) );
                }
            }
}

export const updateBuro = (buro) => {
    return (dispatch) => {
        dispatch({ type: UPADATE_BURO, payload: { buro } });
    };
    };

export const updateBuroScore = (score) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_BURO_SCORE, payload: { score } });
    };
    };

export const updateBuroMoral = (BuroMoral) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_BURO_MORAL, payload: { BuroMoral } });
    };
    };

export const updateBuroMoralScore = (BuroMoralScore) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_BURO_MORAL_SCORE, payload: { BuroMoralScore } });
    };
    };



