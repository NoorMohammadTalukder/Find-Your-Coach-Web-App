export default{
    async login(context,payload){
       // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo',{
            method:'POST',
            body:JSON.stringify({
                email:payload.email,
                password:payload.password,
                returnSecureToken:true,
            })
        });

        const responseData=await response.json();

        if (!response.ok){
            console.log("error")
            console.log(responseData);
            const error=new Error(responseData.message || "Failed to authenticate");
            throw error;
        }
        console.log(responseData);

        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expireIn,
        })
    },
    async signup(context,payload){
        console.log(payload.email,payload.password)
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo',{
            method:'POST',
            body:JSON.stringify({
                email:payload.email,
                password:payload.password,
                returnSecureToken:true,
            })
        });
        const responseData=await response.json();

        if (!response.ok){
            console.log("error")
            console.log(responseData);
            const error=new Error(responseData.message || "Failed to authenticate");
            throw error;
        }
        console.log(responseData);

        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expireIn,
        });
    },
    logout(context){
        context.commit("setUser",{
        token:null,
        userId:null,
        tokenExpiration:null,
        })
    }
}