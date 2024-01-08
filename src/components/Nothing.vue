<template>
  <div class="text-center">
    <p>{{ config.nothing }}</p>
  </div>
</template>

<script>
export default {
  name: 'Nothing',
  data () {
    return {
      config: this.getConfig().config
    }
  }
}
</script>
