<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Framework7</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="register">Sign In</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
import firebase from 'firebase';  

export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$f7router.navigate('/');
        }
      }
    },
    methods: {
      register: function(e) {
        this.$store.dispatch('signUserUp', {username: this.username, password: this.password})
       /*  const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          console.log(`User created for ${user.email}`);
          // works! this.$f7router.navigate('/');
          router.back();
        })
        .catch(error => {
         app.dialog.alert(error.message, () => {
        console.log(error.message);
        });
         
        }); */

        e.preventDefault();
      }
    },
  };
</script>