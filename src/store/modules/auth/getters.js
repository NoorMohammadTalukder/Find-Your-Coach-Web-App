export default{
    userId(state){
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        if (state.token !==null){
            return true
        }
    }
}