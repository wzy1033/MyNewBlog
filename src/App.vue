<template>
  <div id="app" class="content">
    <Navbar class="nav-bar" :onshow="isScroll" />
    <router-view v-if="isRouterAlive" />
    <Footer class="footer-bar" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  provide() {
    return {
      //把父组件的reload方法暴露出来
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isScroll: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听页面滚动
  },
  methods: {
    //这是要暴露给子组件的方法，用来刷新子组件
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
      // console.log(this.isScroll)
    },
    // 滚动重置
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.w-full {
  width: 100% !important;
}

.w-full .vs-card__text {
  width: 100%;
}

.hide-navbar-footer .nav-bar,
.hide-navbar-footer .footer-bar {
  display: none;
}

.hide-footer .footer-bar {
  display: none;
}
</style>
