import axios from 'axios';

import {setAlert} from './alert';


import {
    CLEAR_PROFILE, 
    GET_PROFILE, 
    PROFILE_ERROR, 
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
} from './types';

// Get current user profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Get all profiles

export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});

    try {
        const res = await axios.get('/profile');
       
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
};

// Get profile by Id

export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/profile/user/${userId}`);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Get github repos

export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/profile/github/${username}`);
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
        
    } catch (error) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response,
                status: error.response
            }
        })
    }
};

//Create or Update Profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/profile', formData, config);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } 
    catch (error) {
        const errors = error.response.data.message;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/profile/experience', formData, config);


        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    } 
    catch (error) {
        const errors = error.response.data.message;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Add Education

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/profile/education', formData, config);


        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    } 
    catch (error) {
        const errors = error.response.data.message;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Delete Experience

export const deleteExperience = index => async dispatch => {
    try {
        const res = await axios.delete(`/profile/experience/${index}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } 
    catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.message,
                status: error.response.status
            }
        })
    }
};

// Delete Education

export const deleteEducation = index => async dispatch => {
    try {
        const res = await axios.delete(`/profile/education/${index}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } 
    catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

//Delete Account & Profile

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can not be undone!')) {
        try {
            await axios.delete('/profile');
    
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
    
            dispatch(setAlert('Your account has benn permanently deleted'));
        } 
        catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
};