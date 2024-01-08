// store.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: false // 初始主题为亮色
  },
  mutations: {
    toggleTheme(state) {
      // 切换主题
      state.dark = !state.dark;
    }
  },
  actions: {
    toggleTheme(context) {
      // 触发切换主题的 mutation
      context.commit("toggleTheme");
    }
  },
  getters: {
    currentTheme(state) {
      // 获取当前主题
      return state.dark;
    }
  }
});
