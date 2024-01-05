<template>
  <div class="root">
    <div class="site-header">
      <div class="out">
        <transition name="inner" appear>
          <div class="inner"></div>
        </transition>
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

.inner-enter-active {
  animation: shrinkKeyframes 1.5s;
  animation-timing-function: cubic-bezier(0.62, 0.21, 0.25, 1);
}

@keyframes shrinkKeyframes {
  0% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

.out {
  width: 500px;
  height: 500px;
  background-color: aqua;
  overflow: hidden;
  .inner {
    width: 450px;
    height: 450px;
    background-color: blue;
  }
}

</style>
