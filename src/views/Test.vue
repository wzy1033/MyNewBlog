<template>
  <div class="root">
    <div class="site-header">
      <div class="out">
        <div class="inner1"></div>
        <div class="inner2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Test"
};
</script>
<style lang="scss" scoped>
.out {
  width: 500px;
  height: 500px;
  margin-left: 20px;
  background-color: aqua;
  overflow: hidden;
  position: relative;
  .inner1 {
    width: 450px;
    height: 450px;
    background-color: blue;
    position: absolute;
  }
  .inner2 {
    width: 200px;
    height: 200px;
    background-color: red;
    z-index: 2;
    position: relative;
  }
}
</style>
