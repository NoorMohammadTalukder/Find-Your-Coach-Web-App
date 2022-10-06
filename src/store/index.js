import { createStore } from "vuex";
import coachesModule from './modules/coaches/index.js';
import requestModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store=createStore({
    modules:{
        coaches:coachesModule,
        requests:requestModule,
        auth:authModule,
    },
    // state(){
    //     return{
    //         userId:'c2'
    //     };
      
    // },
    // getters:{
    //     userId(state){
    //         return state.userId;
    //     }
    // }
});

export default store;