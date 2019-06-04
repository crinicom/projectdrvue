// Import Vue
import Vue from 'vue';
import './firebaseInit';
// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
import {store} from './store'

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const myApp = new Vue({
  el: '#app',
  render: (h) => h(App),
  store,

  // Register App Component
  components: {
    app: App
  },
  created() {
    this.$store.dispatch('loadProjects')  
  }
});
export default myApp;