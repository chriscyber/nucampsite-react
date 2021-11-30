import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites'; //to use in server sim

//action creator function to add a comment. returns an object
export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text //ES6: can shorten to just text if identifier of prop is same as the value = "shorthand property names"
    }

})

export const fetchCampsites = () => dispatch => { //redux' dispatch method passed into function. Double arrows = redux thunk syntax

    dispatch(campsitesLoading()); //use redux dispatch method here. Dispatches campsitesLoading below 

    setTimeout(() => {  //to simulate server delay
        dispatch(addCampsites(CAMPSITES)); 
    }, 2000);
};

export const campsitesLoading = () => ({ //action creator that just returns object, no payload, no middleware; goes straight to reducer
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});