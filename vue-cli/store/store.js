import Vue from 'vue';
import Vuex  from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
	state:{
		login: false
	},
	getters:{
		login: state =>{
			return state.login;
		}
	},
	mutations:{
		checkLogin: (state,payload) => {
			state.login = payload;
		},
	},
	actions:{
		checkLogin:({ commit },payload) => {
            commit('checkLogin',payload);
        }
	}
})