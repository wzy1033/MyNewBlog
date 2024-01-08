import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Home1 from "../views/Home1.vue";
import ViewPost from "../views/ViewPost.vue";
import ViewTag from "../views/ViewTag.vue";
import About from "../views/About.vue";
import ViewTags from "../views/ViewTags.vue";
import ViewProjects from "../views/ViewProjects.vue";
import Links from "../views/Links.vue";
import Test from "../views/Test.vue";
import ViewPosts from "../views/ViewPosts.vue";
import ViewPhoto from "../views/ViewPhoto.vue";
import ViewPhotoList from "../views/ViewPhotoList.vue";
import NotFound from "../views/errors/NotFound.vue";

const children = [];

let Posts = null;
try {
  Posts = require("@/../posts/data/posts.json");
} catch (e) {
  Posts = require("@/defaults/posts.json");
}

Posts.posts.map(post => {
  children.push({
    path: post.id,
    component: async function() {
      let value;
      await import(`@/../posts/${post.id}.md`).then(val => {
        value = val;
      });
      return value.vue.component;
    }
  });
});
Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "Home1",
    component: Home1
  },
  {
    path: "/posts",
    name: "ViewPosts",
    component: ViewPosts
  },
  {
    path: "/posts",
    name: "ViewPost",
    component: ViewPost,
    children: children
  },
  {
    path: "/photo/:id",
    name: "ViewPhoto",
    component: ViewPhoto,
    props: true
  },
  {
    path: "/tags/:tag",
    name: "ViewTag",
    component: ViewTag
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/tags",
    name: "ViewTags",
    component: ViewTags
  },
  {
    path: "/projects",
    name: "ViewProjects",
    component: ViewProjects
  },
  {
    path: "/links",
    name: "Links",
    component: Links
  },
  {
    path: "/Test",
    name: "Test",
    component: Test
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/photolist",
    name: "photolist",
    component: ViewPhotoList
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

/** 解决跳转重复路由报错问题 */

const routerPush = router.push;

export default router;
