import { usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const addPost = () => {
    return {
        type: ADD_POST
    }
}
export const onPostChange = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT, newText: text
    }
}
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE, profile
    }
}
// thunk creators
export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
    .then(data => {
         dispatch(setUserProfile(data))
    })
}

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first page', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 10 },
        { id: 4, message: 'Blabla', likesCount: 1},
    ],
    newPostText: "",
    profile: null

}

const profileReducer = (state = initialState, action) => {

    // let stateCopy = { ...state };


    switch (action.type) {
        //debugger; //в devtools f11 войти в метод
        case ADD_POST: 
            let newPost = {
                id: state.posts[state.posts.length - 1].id + 1,
                // id: 5,
                message: state.newPostText,
                likesCount: 0,
                key: state.posts[state.posts.length - 1].id + 1
            };
            // stateCopy.posts = [...state.posts];
            // stateCopy.posts.push(newPost);   //add a post
            // stateCopy.newPostText = '';
            // return stateCopy;
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        

        case UPDATE_NEW_POST_TEXT:
            // stateCopy.newPostText = action.newText;
            // return stateCopy;
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        default: return state
    }
    // return state;
}
export default profileReducer;

