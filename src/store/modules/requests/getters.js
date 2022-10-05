export default{
    requests(state,_,_2,rootgetters){
    // requests(state){
        const coachId=rootgetters.userId;
        // console.log(coachId);
        // const coachId="c3";
        // console.log(state.requests);
        // let a=state.requests;
         let x= state.requests.filter(req=>req.coachId===coachId);
        // console.log(x);
        return x;
       
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length >0;
    }
}