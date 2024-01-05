<template>
  <div id="app" class="content">
    <Navbar />
    <router-view />
    <Footer />
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
</style>
