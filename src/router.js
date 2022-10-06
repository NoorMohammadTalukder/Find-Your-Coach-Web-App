import { createRouter, createWebHashHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
// import C from './pages/requests/a.vue'
import RequestReceived from './pages/requests/RequestReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index.js';

import NotFound from './pages/NotFound.vue';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },

    { path: '/coaches', component: CoachesList },

    {
      path: '/coaches/:id',
      component: CoachDetail,
      props:true,
      children: [
        { path: 'contact', component: ContactCoach }
        // { path: 'c', component: C }
      ], // coaches/c1/contact
    },

    { path: '/register', component: CoachRegistration,meta:{requiresAuth:true} },

    { path: '/requests', component: RequestReceived,meta:{requiresAuth:true}  },
    // { path: '/coaches/:id/contact', 
    //   component: ContactCoach,
    //   props:true,
    //  },
    {path:'/auth',component:UserAuth,meta:{requiresUnauth:true}},
    { path: '/:notfound(.*)', component: NotFound },
  ],

});

router.beforeEach(function(to,_,next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
  }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/coaches');
  }else{
    next();
  }
});
export default router;
