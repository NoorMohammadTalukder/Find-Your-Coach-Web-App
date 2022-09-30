import { createRouter, createWebHashHistory } from 'vue-router';

import CoachDeatail from './pages/coaches/CoachDeatail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect:'/coaches' },

    { path: '/coaches', component: CoachesList },

    {
      path: '/coaches/:id',
      component: CoachDeatail,
      children: [{ path: '/contact', component: ContactCoach }],// coaches/c1/contact
    },

    { path: '/register', component: CoachRegistration },

    { path: '/requests', component: RequestReceived },

    { path: '/:notfound(.*)', component: NotFound },
  ],
});

export default router;
