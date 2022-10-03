export default{
    requests(state,_,_2,rootgetters){
        const coachId=rootgetters.userId;
        return state.requests.filter(req=>req.coachId===coachId);
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length >0;
    }
}