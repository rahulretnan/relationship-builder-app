const persons = (persons = [], action) =>{
    switch(action.type){
        case 'FETCH_All_PERSONS':
            return action.payload;
        case 'CREATE_PERSON':
            return action.payload;
        default:
            return persons;
    }
}
export default persons;