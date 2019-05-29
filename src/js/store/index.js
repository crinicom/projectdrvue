import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import myApp from '../app'

Vue.use(Vuex)

export const store = new Vuex.Store({
   // export default new Vuex.Store({
    state: {
        loadedProjects: [
            //minuto 5.28 video manage state with vuex
        ],
        user: null
    },
    mutations: {
        createProject(state, payload) {
            state.loadedProjects.push(payload);
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoadedProjects (state, payload) {
            state.loadedProjects = payload;
        }
    },
    actions: {
        loadProjects({commit}) {
            firebase.database().ref('projects').once('value')
            .then((data) => {
                const projects = [];
                const obj = data.val();
                for (let key in obj) {
                    projects.push({
                            id: key,
                            info: obj[key].info

                        })
                }
                commit('setLoadedProjects', projects)
            })
            .catch((error) => {
                console.log(error);
            })
        },
        createProject ({commit}, payload) {
            const project = {
                info: {
                    title: '',
                    description: '',
                    background: '',
                    webdrive: {
                        URL: '',
                        provider: ''
                    },
                    risks: [],
                    creation_date: '',
                    canAccess: [],
                    creator: ''   
                }

            }
            firebase.database().ref('projects').push(project)
                .then((data)=> {
                    console.log(data);
                    const key = data.key;
                    commit('createProject', { ...project, id: key});
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        //createmeetup()
        signUserUp ({commit}, payload) {
            const self = this;
            const app = self.$f7;
           // const router = self.$f7router;
            firebase.auth().createUserWithEmailAndPassword(payload.username, payload.password)
            .then(user => { 
                const newUser = {
                    id: user.uid,
                    registeredProjects: []
                }
                commit('setUser',newUser); // ejecuta la acción SINCRONA
               
                // FUNCIONA!  Pero se reemplazó por un watch a nivel de register.vue, que hace un router.push('/') 
                // cuando detecta que el STORE tiene un usuario conectado
                //myApp.$f7ready(($f7) => {$f7.views.main.router.navigate('/');});
               
            })
            .catch(error => {
                console.log(error.message);
               /*  app.dialog.alert(error.message, () => {
                    console.log(error.message);
                    }); */
            })
        },
        signUserIn ({commit}, payload) {
            const self = this;
            const app = self.$f7;
           // const router = self.$f7router;
            firebase.auth().signInWithEmailAndPassword(payload.username, payload.password)
            .then(user => { 
                const newUser = {
                    id: user.uid,
                    registeredProjects: []
                }
                commit('setUser',newUser); // ejecuta la acción SINCRONA
               
                // FUNCIONA!  Pero se reemplazó por un watch a nivel de register.vue, que hace un router.push('/') 
                // cuando detecta que el STORE tiene un usuario conectado
                //myApp.$f7ready(($f7) => {$f7.views.main.router.navigate('/');});
               
            })
            .catch(error => {
                console.log(error.message);
               /*  app.dialog.alert(error.message, () => {
                    console.log(error.message);
                    }); */
            });
        },
    logout ({commit}, payload) {
        firebase.auth().signOut().then(() => {
            this.isLoggedIn = false;
            console.log("logged out!");
            commit('setUser', null);
             //router.navigate('/login/');
            });
    }
    },
    getters: {
        loadedProjects (state) {
            return state.loadedProjects.sort();
        },
        loadedProject(state) {
            return (ProjectId) => {
                return state.loadedProjects.find((project) => {
                    return project.id === ProjectId
                })
            }
        },
        user (state) {
            return state.user
        }

    }
})

export default store;