const relations = (relations = [], action) =>{
    switch(action.type){
        case 'FETCH_All_RELATIONS':
            return action.payload;
        case 'CREATE_RELATION':
            return action.payload;
        case 'CHECK_RELATION':
            return action.payload;
        default:
            return relations;
    }
}
export default relations;