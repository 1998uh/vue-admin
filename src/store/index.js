import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
//增加刷新保存
import persistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {},
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      storage2: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: (key) => Cookies.remove(key)
      },
      reducer(val) {
        return {
          //需要刷新保存的属性，放在下面
          data: {
            title: val.root.title
          }
        };
      }
    })
  ],
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {},
  modules: modules
});
export default store;
