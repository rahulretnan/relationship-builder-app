const relationCheck = (relationCheck = [], action) =>{
    switch(action.type){
        case 'CHECK_RELATION':
            return action.payload;
        default:
            return relationCheck;
    }
}
export default relationCheck;