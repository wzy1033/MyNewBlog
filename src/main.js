import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from "vuesax";
import axios from 'axios';


import "vuesax/dist/vuesax.css";
import "boxicons";
import "boxicons/css/boxicons.min.css";

console.log(
  "background-color: #1A55ED; padding: 7px; color: #fff;",
  "background-color: #FCBF23; color: #000; padding: 7px;",
  "font-weight: bold"
);

Vue.config.productionTip = false;

Vue.use(Vuesax, {});
Vue.prototype.$axios = axios;

Vue.mixin({
  methods: {
    changeTitle: function(title) {
      let Config = null;
      try {
        Config = require("@/../posts/data/config.json");
      } catch (e) {
        Config = require("@/defaults/config.json");
      }
      document.title = `${title} - ${Config.config.blogTitle}`;
    },
    getConfig: function(name = "config.json") {
      let Config = null;
      try {
        Config = require(`@/../posts/data/${name}`);
      } catch (e) {
        Config = require(`@/defaults/${name}`);
      }
      return Config;
    }
  },
  computed: {
    tags: function() {
      let Posts = null;
      try {
        Posts = require("@/../posts/data/posts.json");
      } catch (e) {
        Posts = require("@/defaults/posts.json");
      }
      const posts = Posts.posts;
      const tags = [];
      for (var i = 0; i < posts.length; i++) {
        for (var j = 0; j < posts[i].tags.length; j++) {
          let index = -1;
          for (var k = 0; k < tags.length; k++) {
            if (tags[k].name === posts[i].tags[j]) {
              index = k;
              break;
            }
          }
          if (index === -1) {
            tags.push({
              name: posts[i].tags[j],
              posts: [posts[i]]
            });
          } else {
            tags[index].posts.push(posts[i]);
          }
        }
      }
      return tags;
    }
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
