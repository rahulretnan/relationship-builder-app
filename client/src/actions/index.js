import * as api from '../api';

export const getPerson = () => async(dispatch) => {
    try{
        const { data } = await api.fetchPerson();
        dispatch({ type: 'FETCH_All_PERSONS', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const createPerson = (person) => async (dispatch) =>{
    try{
        const { data } = await api.createPerson(person);
        dispatch({ type: 'CREATE_PERSON', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const getTag = () => async(dispatch) => {
    try{
        const { data } = await api.fetchTag();
        dispatch({ type: 'FETCH_All_TAGS', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const createTag = (tag) => async (dispatch) =>{
    try{
        const { data } = await api.createTag(tag);
        dispatch({ type: 'CREATE_TAG', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}
export const updateTag = (id,tag) => async (dispatch) =>{
    try{
        const { data } = await api.updateTag(id,tag);
        dispatch({ type: 'UPDATE_TAG', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const getRelation = () => async(dispatch) => {
    try{
        const { data } = await api.fetchRelation();
        dispatch({ type: 'FETCH_All_RELATIONS', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const createRelation = (relation) => async (dispatch) =>{
    try{
        const { data } = await api.createRelation(relation);
        dispatch({ type: 'CREATE_RELATION', payload: data });
    }catch(error){ 
        console.log(error.message);
    }
}

export const checkRelation = (relation) => async(dispatch) => {
    try{
        const { data } = await api.checkRelation(relation);
        dispatch({ type: 'CHECK_RELATION', payload: data });
        
    }catch(error){ 
        console.log(error.message);
    }
}