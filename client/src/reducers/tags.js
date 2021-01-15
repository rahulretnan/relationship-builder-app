const tags = (tags = [], action) =>{
    switch(action.type){
        case 'FETCH_All_TAGS':
            return action.payload;
        case 'CREATE_TAG':
            return action.payload;
        case 'UPDATE_TAG':
            return action.payload;
        default:
            return tags;
    }
}
export default tags;