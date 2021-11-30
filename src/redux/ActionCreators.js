import * as ActionTypes from './ActionTypes';

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