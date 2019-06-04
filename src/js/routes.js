
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';

import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';
import AuthGuard from './auth-guard.js';
import securedRoute from './securedRoute.js';
import {store} from './store';

/* resuelvo el problema de check auth viendo esto
http://forum.framework7.io/t/issue-with-f7-vue-routes-component-async-at-same-time-doesnt-works/4469/8
funciona! */

var accessed = false;

var routes = [
  securedRoute('/about/', AboutPage),
  securedRoute('/form/', FormPage),
  {
    path: '/',
    component: HomePage,
  },
  /* {
    path: '/about/',
    //component: AboutPage,
    async: AuthGuard
    
   
  }, */
  /* {
    path: '/form/',
    
    async(routeTo, routeFrom, resolve, reject) {
      console.log("entro al async")
      if (store.getters.user) {
        console.log("hay usuario")
        resolve({component:FormPage
        })
      }
      else
      {
        console.log("no hay usuario")
        resolve({
          component: Login})
      }
    },
    //component: FormPage,
  }, */
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/register/',
    component: Register,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
    beforeEnter: AuthGuard,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
