<template>
  <div>
    <vs-navbar
      class="navbar"
      :class="{ dark: dark, onshow: onshow }"
      shadow-scroll
      fixed
      center-collapsed
      not-line
    >
      <template #left>
        <vs-button
          flat
          icon
          style="margin-right: 20px"
          class="menu-btn"
          @click="activeSidebar = !activeSidebar"
        >
          <i class="bx bx-menu"></i>
        </vs-button>
        <router-link to="/" class="navbar-link">
          <img
            src="https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/logo.png"
            alt="Logo"
            class="logo"
          />
          <h3>{{ config.blogTitle }}</h3>
        </router-link>
      </template>
      <vs-navbar-item
        v-for="(link, index) in links"
        :key="index"
        :active="active.name === link.name"
        :to="active.name === link.name ? null : link.url"
      >
        {{ link.name }}
      </vs-navbar-item>
      <template #right>
        <vs-navbar-item>
          <vs-switch @click="changeTheme()">
            <template #on>
              <i class="bx bxs-sun"></i>
            </template>
            <template #off>
              <i class="bx bxs-moon"></i>
            </template>
          </vs-switch>
        </vs-navbar-item>
      </template>
    </vs-navbar>
    <vs-sidebar v-model="activeItem" :open.sync="activeSidebar">
      <template #logo>
        <h3>{{ config.blogTitle }}</h3>
      </template>
      <vs-sidebar-item
        v-for="(link, index) in links"
        :key="index"
        :to="link.url"
        :id="link.name"
      >
        {{ link.name }}
      </vs-sidebar-item>
    </vs-sidebar>
    <!-- <div style="margin-bottom: 100px"></div> -->
  </div>
</template>

<script>
let Config = null;
try {
  Config = require("@/../posts/data/config.json");
} catch (e) {
  Config = require("@/defaults/config.json");
}

export default {
  name: "Navbar",
  data: () => {
    return {
      config: Config.config,
      activeItem: "Home",
      activeSidebar: false,
      dark: false,
      links: [
        {
          name: "主页",
          url: "/"
        },
        {
          name: "文档",
          url: "/posts"
        },
        {
          name: "照片",
          url: "/photolist"
        },
        {
          name: "音乐",
          url: "/music"
        },
        {
          name: "标签",
          url: "/tags"
        },
        {
          name: "关于",
          url: "/about"
        }
      ]
    };
  },
  methods: {
    changeTheme() {
      if (this.dark) {
        document
          .getElementsByTagName("body")[0]
          .setAttribute("vs-theme", "light");
        this.dark = false;
      } else {
        document
          .getElementsByTagName("body")[0]
          .setAttribute("vs-theme", "dark");
        this.dark = true;
      }
      //console.log(this.dark);
      this.$store.dispatch("toggleTheme");
      //console.log(this.$store.getters.currentTheme);
    }
  },
  computed: {
    active() {
      const cur = this.$route.path;
      var ret = {
        name: null,
        url: null
      };
      for (var i = 0; i < this.links.length; i++) {
        if (this.links[i].url === cur) ret = this.links[i];
      }
      return ret;
    }
  },
  props: {
    onshow: false
  }
};
</script>

<style lang="scss">
.navbar-link {
  display: flex;
  align-items: center;
  color: #000;
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}

[vs-theme="dark"] .navbar-link {
  color: #fff;
}

.navbar {
  background-color: transparent !important;
  &.dark:hover {
    background-color: rgba(30, 32, 35, 1) !important;
  }

  &:not(.dark):hover {
    background-color: white !important;
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dark.onshow {
  background-color: rgba(30, 32, 35, 1) !important;
}

:not(.dark).onshow {
  background-color: white !important;
}
</style>
