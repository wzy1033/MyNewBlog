<template>
  <div class="container text-center">
    
  </div>
</template>

<script>
let About = null
try {
  About = require('@/../posts/data/about.md')
} catch (e) {
  About = require('@/defaults/about.md')
}

export default {
  name: 'AboutMe',
  components: {
    About: About.vue.component
  },
  mounted: function () {
    this.changeTitle('About')
  }
}
</script>
