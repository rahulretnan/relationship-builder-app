import axios from 'axios';

const url = 'https://relationship-builder-api.herokuapp.com/';
const personUrl = url + 'person';
const tagUrl = url + 'tag';
const relationUrl = url + 'relation';


export const fetchPerson = ()=> axios.get(personUrl);
export const createPerson = (newPerson)=> axios.post(personUrl,newPerson);

export const fetchTag = ()=> axios.get(tagUrl);
export const createTag = (newTag)=> axios.post(tagUrl,newTag);
export const updateTag = (id,updatedTag)=> axios.patch(`${tagUrl}/${id}`,updatedTag);

export const fetchRelation = ()=> axios.get(relationUrl);
export const createRelation = (newRelation)=> axios.post(relationUrl,newRelation);
export const checkRelation = (checkRelation)=> axios.post(`${relationUrl}/check`,checkRelation);