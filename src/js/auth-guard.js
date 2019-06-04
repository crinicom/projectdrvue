import {store} from './store';
import Login from '../pages/login.vue';

const AuthGuard = function(routeTo, routeFrom, resolve, reject) {
      console.log("hasta aqui llego!", routeTo)
        if (store.getters.user) {
            resolve({component: routeTo})
        } else {
            resolve({component: Login})
        }
}
export default AuthGuard;