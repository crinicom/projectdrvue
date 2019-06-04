import {store} from './store';
import Login from '../pages/login.vue';

const securedRoute = (path, component) => {
    return {
      path,
      async(to, from, resolve, reject) {
        if (store.getters.user) {
          resolve({component: component})
        } else {
          resolve({component:Login})
        }
      }
    }
  }
  export default securedRoute;