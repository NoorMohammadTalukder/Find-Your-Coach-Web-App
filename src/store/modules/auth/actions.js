export default{
    // async login(context,payload){
    //    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
    //     const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo',{
    //         method:'POST',
    //         body:JSON.stringify({
    //             email:payload.email,
    //             password:payload.password,
    //             returnSecureToken:true,
    //         })
    //     });

    //     const responseData=await response.json();

    //     if (!response.ok){
    //         console.log("error")
    //         console.log(responseData);
    //         const error=new Error(responseData.message || "Failed to authenticate");
    //         throw error;
    //     }
    //     console.log(responseData);

    //     context.commit('setUser',{
    //         token:responseData.idToken,
    //         userId:responseData.localId,
    //         tokenExpiration:responseData.expireIn,
    //     })
    // },
    // async signup(context,payload){
    //     console.log(payload.email,payload.password)
    //     const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo',{
    //         method:'POST',
    //         body:JSON.stringify({
    //             email:payload.email,
    //             password:payload.password,
    //             returnSecureToken:true,
    //         })
    //     });
    //     const responseData=await response.json();

    //     if (!response.ok){
    //         console.log("error")
    //         console.log(responseData);
    //         const error=new Error(responseData.message || "Failed to authenticate");
    //         throw error;
    //     }
    //     console.log(responseData);

    //     context.commit('setUser',{
    //         token:responseData.idToken,
    //         userId:responseData.localId,
    //         tokenExpiration:responseData.expireIn,
    //     });
    // },

    async login(context,payload){
       return context.dispatch('auth',{
           ...payload,
           mode:"login"
       }) 
    },
    async signup(context,payload){
       return context.dispatch('auth',{
           ...payload,
           mode:"signup"
       }) 
    },

    async auth(context,payload){
        const mode=payload.mode;
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo';

        if(mode==="signup"){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3TNKAaGP7-O5XNTfQs85JjSQS8zlJJEo'
        }
        const response= await fetch(url,{
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
        localStorage.setItem('token',responseData.idToken);
        localStorage.setItem('userId',responseData.localId)
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expireIn,
        })
    },
    tryLogin(context){
        const token=localStorage.getItem("token");
        const userId=localStorage.getItem("userId");

        if(token && userId){
            context.commit('setUser',{
                token:token,
                userId:userId,
                tokenExpiration:null,
            })
        }
    },
    logout(context){
        context.commit("setUser",{
        token:null,
        userId:null,
        tokenExpiration:null,
        })
    },
   
}