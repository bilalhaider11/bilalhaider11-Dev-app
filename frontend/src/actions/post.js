import axios from "axios";

import {setAlert} from './alert';

import { 
    POST_ERROR, 
    GET_POSTS, 
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types";

//Get posts

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts');
        
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

//Add like

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/posts/like/${id}`);
        
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

//Remove like

export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/posts/unlike/${id}`);
        
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Delete Post

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/posts/${id}`);
        
        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

//Add post

export const addPost = formDate => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/posts', formDate, config);
        
        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added!', 'success'));
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};


//Get post

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`);
        
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

//Add Comment

export const addComment = (postId, formDate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/posts/comment/${postId}`, formDate, config);
        
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added!', 'success'));
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

//Delete Comment

export const deleteComment = (postId, commentId) => async dispatch => { 
    try {
        await axios.delete(`/posts/comment/${postId}/${commentId}`);
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed!', 'success'));
    } 
    catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};