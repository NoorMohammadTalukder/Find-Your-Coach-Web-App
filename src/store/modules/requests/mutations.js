export default{
    addRequest(state,payload){
        state.requests.push(payload)
    },
    setRequest(state,payload){
        // console.log("payload"+payload)
        state.requests=payload;
    }
}